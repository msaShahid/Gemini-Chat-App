import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [text, setText] = useState('');
  const keyboardVisible = useKeyboardVisible();
  const insets = useSafeAreaInsets();

  const canSend = text.trim().length > 0 && !isLoading;

  const handleSend = () => {
    if (!canSend) return;
    onSend(text);
    setText('');
  };

  return (
    <View
      className="w-full max-w-3xl self-center px-4 pt-2"
      // When the keyboard is open it already sits above the system bars.
      style={{ paddingBottom: keyboardVisible ? 45 : Math.max(insets.bottom, 12) }}
    >
      <View className="flex-row items-end rounded-3xl border border-line bg-card py-2 pl-5 pr-2">
        <TextInput
          className="max-h-32 flex-1 py-2 pr-2 text-base leading-6 text-ink placeholder:text-muted"
          value={text}
          onChangeText={setText}
          placeholder="Message Gemini"
          multiline
          maxLength={4000}
          accessibilityLabel="Message input"
        />
        <Pressable
          onPress={handleSend}
          disabled={!canSend}
          accessibilityRole="button"
          accessibilityLabel="Send message"
          className={
            canSend
              ? 'h-10 w-10 items-center justify-center rounded-full bg-brand active:bg-brand-dark'
              : 'h-10 w-10 items-center justify-center rounded-full bg-line'
          }
        >
          <Text className={canSend ? 'text-xl font-bold text-white' : 'text-xl font-bold text-muted'}>
            ↑
          </Text>
        </Pressable>
      </View>

      {keyboardVisible ? null : (
        <Text className="mt-2 text-center text-[11px] text-muted">
          Gemini can make mistakes. Check important info.
        </Text>
      )}
    </View>
  );
}
