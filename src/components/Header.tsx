import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  onNewChat: () => void;
  newChatDisabled: boolean;
  /** When provided, a back button is shown before the logo (used when chat is a pushed screen). */
  onBack?: () => void;
}

export function Header({ onNewChat, newChatDisabled, onBack }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="border-b border-line bg-paper" style={{ paddingTop: insets.top }}>
      <View className="w-full max-w-3xl flex-row items-center justify-between gap-3 self-center px-5 py-3">
        {/* flex-1 + shrink lets the title truncate instead of pushing "New chat" off-screen. */}
        <View className={`flex-1 shrink flex-row items-center ${onBack ? 'gap-2.5' : 'gap-3'}`}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={8}
              className="-ml-1 h-10 w-10 items-center justify-center rounded-full border border-line bg-card active:opacity-60"
            >
              <Text className="text-lg font-semibold text-ink">←</Text>
            </Pressable>
          ) : null}
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-brand">
            <Text className="text-lg font-bold text-white">G</Text>
          </View>
          <View className="flex-1 shrink">
            <Text numberOfLines={1} className="text-lg font-bold tracking-tight text-ink">
              Gemini Chat
            </Text>
            <Text numberOfLines={1} className="text-xs text-muted">
              Powered by Google Gemini
            </Text>
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
