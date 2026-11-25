import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ChatInput } from './src/components/ChatInput';
import { ErrorBanner } from './src/components/ErrorBanner';
import { Header } from './src/components/Header';
import { MessageBubble } from './src/components/MessageBubble';
import { TypingIndicator } from './src/components/TypingIndicator';
import { WelcomeScreen } from './src/components/WelcomeScreen';
import { useChat } from './src/hooks/useChat';
import { colors, spacing } from './src/theme';
import type { ChatMessage } from './src/types/chat';

export default function App() {
  const { messages, isLoading, error, sendMessage, retry, startNewChat, dismissError } = useChat();
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const hasMessages = messages.length > 0;

  const scrollToLatest = () => listRef.current?.scrollToEnd({ animated: true });

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Header onNewChat={startNewChat} newChatDisabled={!hasMessages && !error} />

        {hasMessages ? (
          <FlatList
            ref={listRef}
            style={styles.flex}
            contentContainerStyle={styles.listContent}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            ListFooterComponent={isLoading ? <TypingIndicator /> : undefined}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            onContentSizeChange={scrollToLatest}
            onLayout={scrollToLatest}
          />
        ) : (
          <WelcomeScreen onSelectSuggestion={sendMessage} />
        )}

        {error ? <ErrorBanner message={error} onRetry={retry} onDismiss={dismissError} /> : null}

        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
  },
});
