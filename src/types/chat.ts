// "model" is the role name the Gemini API uses for the AI's own messages.
export type ChatRole = 'user' | 'model';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}
