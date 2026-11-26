import './global.css';

import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChatInput } from './src/components/ChatInput';
import { ErrorBanner } from './src/components/ErrorBanner';
import { Header } from './src/components/Header';
import { MessageBubble } from './src/components/MessageBubble';
import { TypingIndicator } from './src/components/TypingIndicator';
import { WelcomeScreen } from './src/components/WelcomeScreen';
import { useChat } from './src/hooks/useChat';
import { useKeyboardAvoidance } from './src/hooks/useKeyboardAvoidance';
import type { ChatMessage } from './src/types/chat';

// The keyboard logic needs safe-area insets, so it lives in this inner component,
// which is rendered inside <SafeAreaProvider>.
function ChatScreen() {
  const { messages, isLoading, error, sendMessage, retry, startNewChat, dismissError } = useChat();
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
        <Header onNewChat={startNewChat} newChatDisabled={!hasMessages && !error} />

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

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}
