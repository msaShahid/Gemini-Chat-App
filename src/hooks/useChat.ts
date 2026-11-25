import { useCallback, useRef, useState } from 'react';
import { sendChatMessage } from '../services/gemini';
import type { ChatMessage, ChatRole } from '../types/chat';

let messageCounter = 0;

function createMessage(role: ChatRole, text: string): ChatMessage {
  messageCounter += 1;
  return { id: `${Date.now()}-${messageCounter}`, role, text };
}

/** Holds the conversation for the current app session and talks to Gemini. */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lets us ignore the answer to a request that was started before "New chat".
  const requestIdRef = useRef(0);

  const requestReply = useCallback(async (history: ChatMessage[]) => {
    requestIdRef.current += 1;
    const requestId = requestIdRef.current;

    setIsLoading(true);
    setError(null);

    try {
      const reply = await sendChatMessage(history);
      if (requestId !== requestIdRef.current) return;
      setMessages((previous) => [...previous, createMessage('model', reply)]);
    } catch (e) {
      if (requestId !== requestIdRef.current) return;
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const history = [...messages, createMessage('user', trimmed)];
      setMessages(history);
      void requestReply(history);
    },
    [messages, isLoading, requestReply],
  );

  // Re-sends the conversation after a failure (the last message is still the user's).
  const retry = useCallback(() => {
    if (isLoading || messages.length === 0) return;
    void requestReply(messages);
  }, [messages, isLoading, requestReply]);

  const startNewChat = useCallback(() => {
    requestIdRef.current += 1; // invalidates any request still in flight
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  return { messages, isLoading, error, sendMessage, retry, startNewChat, dismissError };
}
