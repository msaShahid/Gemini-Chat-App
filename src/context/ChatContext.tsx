import { createContext, useContext, type ReactNode } from 'react';
import { useChat } from '../hooks/useChat';

type ChatContextValue = ReturnType<typeof useChat>;

const ChatContext = createContext<ChatContextValue | null>(null);

/**
 * Shares one conversation across the whole app, so the chat survives navigating
 * between screens and other screens (Home, Dashboard, Profile) can read it.
 * Rendered once in the root layout.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChat();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

/** Access the shared conversation. Must be used inside <ChatProvider>. */
export function useChatSession(): ChatContextValue {
  const value = useContext(ChatContext);
  if (!value) {
    throw new Error('useChatSession must be used inside <ChatProvider>.');
  }
  return value;
}
