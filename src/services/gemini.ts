import { GEMINI_API_KEY, GEMINI_MODEL } from '../config/env';
import type { ChatMessage, ChatRole } from '../types/chat';

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const REQUEST_TIMEOUT_MS = 30000;

// Markdown is not rendered by plain <Text>, so ask Gemini for plain text.
const SYSTEM_PROMPT =
  'You are a helpful, friendly assistant inside a mobile chat app. ' +
  'Keep answers clear and concise. Reply in plain text only: do not use Markdown ' +
  '(no asterisks, pound signs or backticks). Use short paragraphs, and simple dashes for lists.';

// ---- Types for the parts of the Gemini request/response we use ----

interface GeminiContent {
  role: ChatRole;
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates?: {
    content?: { parts?: { text?: string }[] };
    finishReason?: string;
  }[];
  promptFeedback?: { blockReason?: string };
  error?: { code?: number; message?: string; status?: string };
}

/** An error whose message is safe to show directly to the user. */
export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiError';
  }
}

// Turns our chat history into Gemini's format. Consecutive messages from the
// same role are merged, because Gemini expects the roles to alternate.
function toGeminiContents(messages: ChatMessage[]): GeminiContent[] {
  const contents: GeminiContent[] = [];
  for (const message of messages) {
    const last = contents[contents.length - 1];
    if (last && last.role === message.role) {
      last.parts.push({ text: message.text });
    } else {
      contents.push({ role: message.role, parts: [{ text: message.text }] });
    }
  }
  return contents;
}

function messageForHttpError(status: number, apiMessage?: string): string {
  if (status === 400 && apiMessage?.toLowerCase().includes('api key')) {
    return 'The Gemini API key is not valid. Check EXPO_PUBLIC_GEMINI_API_KEY in your .env.local file.';
  }
  if (status === 401 || status === 403) {
    return 'The Gemini API key was rejected. Check that it is correct and has access to the Gemini API.';
  }
  if (status === 404) {
    return `The model "${GEMINI_MODEL}" was not found. Check the model name in src/config/env.ts.`;
  }
  if (status === 429) {
    return 'Too many requests or the free quota is used up. Wait a moment and try again.';
  }
  if (status >= 500) {
    return 'Gemini is temporarily unavailable. Please try again in a moment.';
  }
  return apiMessage ? `Gemini error: ${apiMessage}` : `Request failed (status ${status}).`;
}

/**
 * Sends the whole conversation to Gemini and returns the model's reply text.
 * Always throws a GeminiError with a user-friendly message on failure.
 */
export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new GeminiError(
      'Missing API key. Add EXPO_PUBLIC_GEMINI_API_KEY to a .env.local file and restart Expo.',
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    let response: Response;
    try {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: toGeminiContents(messages),
        }),
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new GeminiError('The request timed out. Please try again.');
      }
      throw new GeminiError('Could not reach Gemini. Check your internet connection and try again.');
    }

    let data: GeminiResponse;
    try {
      data = (await response.json()) as GeminiResponse;
    } catch {
      throw new GeminiError(
        response.ok
          ? 'Gemini returned a response that could not be read. Please try again.'
          : messageForHttpError(response.status),
      );
    }

    if (!response.ok) {
      throw new GeminiError(messageForHttpError(response.status, data.error?.message));
    }

    if (data.promptFeedback?.blockReason) {
      throw new GeminiError('Gemini could not answer this message. Try rephrasing it.');
    }

    const candidate = data.candidates?.[0];
    const text = (candidate?.content?.parts ?? [])
      .map((part) => part.text ?? '')
      .join('')
      .trim();

    if (!text) {
      throw new GeminiError(
        candidate?.finishReason === 'SAFETY'
          ? 'Gemini could not answer this message. Try rephrasing it.'
          : 'Gemini returned an empty response. Please try again.',
      );
    }

    return text;
  } finally {
    clearTimeout(timeoutId);
  }
}
