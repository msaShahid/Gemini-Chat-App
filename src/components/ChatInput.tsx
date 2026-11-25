import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import { colors, radius, safeArea, spacing } from '../theme';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [text, setText] = useState('');
  const keyboardVisible = useKeyboardVisible();

  const canSend = text.trim().length > 0 && !isLoading;

  const handleSend = () => {
    if (!canSend) return;
    onSend(text);
    setText('');
  };

  return (
    <View
      style={[
        styles.container,
        // When the keyboard is open it already sits above the system bars.
        { paddingBottom: keyboardVisible ? spacing.sm : safeArea.bottom },
      ]}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Message Gemini"
          placeholderTextColor={colors.textMuted}
          multiline
          maxLength={4000}
          accessibilityLabel="Message input"
        />
        <TouchableOpacity
          style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel="Send message"
        >
          <Text style={styles.sendIcon}>↑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.input,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    maxHeight: 120,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: spacing.sm,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
  },
  sendButtonDisabled: {
    backgroundColor: colors.accentDisabled,
  },
  sendIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onAccent,
    lineHeight: 24,
  },
});
