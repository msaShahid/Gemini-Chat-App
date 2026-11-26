import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  onNewChat: () => void;
  newChatDisabled: boolean;
}

export function Header({ onNewChat, newChatDisabled }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="border-b border-line bg-paper" style={{ paddingTop: insets.top }}>
      <View className="w-full max-w-3xl flex-row items-center justify-between self-center px-5 py-3">
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-brand">
            <Text className="text-lg font-bold text-white">G</Text>
          </View>
          <View>
            <Text className="text-lg font-bold tracking-tight text-ink">Gemini Chat</Text>
            <Text className="text-xs text-muted">Powered by Google Gemini</Text>
          </View>
        </View>

        <Pressable
          onPress={onNewChat}
          disabled={newChatDisabled}
          accessibilityRole="button"
          accessibilityLabel="Start a new chat"
          className={
            newChatDisabled
              ? 'flex-row items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 opacity-40'
              : 'flex-row items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 active:opacity-60'
          }
        >
          <Text className="text-base font-semibold leading-5 text-brand">+</Text>
          <Text className="text-sm font-semibold text-ink">New chat</Text>
        </Pressable>
      </View>
    </View>
  );
}
