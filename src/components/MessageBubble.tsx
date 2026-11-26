import { Text, View } from 'react-native';
import type { ChatMessage } from '../types/chat';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.role === 'user') {
    return (
      <View className="mb-4 flex-row justify-end pl-12">
        <View className="shrink rounded-3xl rounded-br-md bg-brand px-4 py-3">
          <Text selectable className="text-base leading-6 text-white">
            {message.text}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-4 flex-row items-end gap-2.5 pr-10">
      <View className="h-8 w-8 items-center justify-center rounded-full bg-brand-soft">
        <Text className="text-xs font-bold text-brand">G</Text>
      </View>
      <View className="shrink rounded-3xl rounded-bl-md border border-line bg-card px-4 py-3">
        <Text selectable className="text-base leading-6 text-ink">
          {message.text}
        </Text>
      </View>
    </View>
  );
}
