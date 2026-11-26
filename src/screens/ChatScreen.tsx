import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { ChatInput } from '../components/ChatInput';
import { ErrorBanner } from '../components/ErrorBanner';
import { Header } from '../components/Header';
import { MessageBubble } from '../components/MessageBubble';
import { TypingIndicator } from '../components/TypingIndicator';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { useChatSession } from '../context/ChatContext';
import { useKeyboardAvoidance } from '../hooks/useKeyboardAvoidance';
import type { ChatMessage } from '../types/chat';

interface ChatScreenProps {
  /** Shows a back button in the header. */
  onBack?: () => void;
}

/**
 * The full chat experience (moved here unchanged from App.tsx so it can be used
 * as an Expo Router screen). Reads the conversation from <ChatProvider>, and must
 * be rendered inside <SafeAreaProvider> because the keyboard logic needs insets.
 */
export function ChatScreen({ onBack }: ChatScreenProps) {
  const { messages, isLoading, error, sendMessage, retry, startNewChat, dismissError } =
    useChatSession();
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const { containerRef, onContainerLayout, keyboardInset } = useKeyboardAvoidance();

  const hasMessages = messages.length > 0;

  const scrollToLatest = () => listRef.current?.scrollToEnd({ animated: true });

  return (
    <View className="flex-1 bg-paper">
      <StatusBar style="dark" />

      {/* This container is lifted above the keyboard via paddingBottom. It uses a plain
          style (no className) so its ref is guaranteed to work for measuring. */}
      <View
        ref={containerRef}
        onLayout={onContainerLayout}
        style={{ flex: 1, paddingBottom: keyboardInset }}
      >
        <Header
          onNewChat={startNewChat}
          newChatDisabled={!hasMessages && !error}
          onBack={onBack}
        />

        {hasMessages ? (
          <FlatList
            ref={listRef}
            className="flex-1"
            contentContainerClassName="w-full max-w-3xl self-center px-4 pb-2 pt-5"
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            ListFooterComponent={isLoading ? <TypingIndicator /> : undefined}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            onContentSizeChange={scrollToLatest}
            onLayout={scrollToLatest}
          />
        ) : (
          <WelcomeScreen onSelectSuggestion={sendMessage} />
        )}

        {error ? <ErrorBanner message={error} onRetry={retry} onDismiss={dismissError} /> : null}

        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </View>
    </View>
  );
}
