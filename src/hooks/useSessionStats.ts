import { useMemo } from 'react';
import { useChatSession } from '../context/ChatContext';

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export type SessionStatus = 'idle' | 'thinking' | 'error';

/** Live numbers about the current conversation, derived from the shared chat state. */
export function useSessionStats() {
  const { messages, isLoading, error } = useChatSession();

  return useMemo(() => {
    const sent = messages.filter((m) => m.role === 'user');
    const replies = messages.filter((m) => m.role === 'model');
    const replyWords = replies.reduce((sum, m) => sum + countWords(m.text), 0);
    const status: SessionStatus = error ? 'error' : isLoading ? 'thinking' : 'idle';

    return {
      totalMessages: messages.length,
      sentCount: sent.length,
      replyCount: replies.length,
      wordsWritten: sent.reduce((sum, m) => sum + countWords(m.text), 0),
      avgReplyWords: replies.length ? Math.round(replyWords / replies.length) : 0,
      lastUserMessage: sent.length ? sent[sent.length - 1].text : null,
      hasConversation: messages.length > 0,
      status,
    };
  }, [messages, isLoading, error]);
}
