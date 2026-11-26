import { Pressable, Text, View } from 'react-native';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onRetry, onDismiss }: ErrorBannerProps) {
  return (
    <View className="w-full max-w-3xl self-center px-4 pb-2">
      <View
        accessibilityRole="alert"
        className="flex-row gap-3 rounded-2xl border border-danger-line bg-danger-soft p-4"
      >
        <View className="h-6 w-6 items-center justify-center rounded-full bg-danger">
          <Text className="text-xs font-bold text-white">!</Text>
        </View>

        <View className="flex-1">
          <Text className="text-sm leading-5 text-danger">{message}</Text>

          <View className="mt-3 flex-row gap-2">
            <Pressable
              onPress={onRetry}
              accessibilityRole="button"
              className="rounded-full bg-danger px-4 py-2 active:opacity-70"
            >
              <Text className="text-sm font-semibold text-white">Try again</Text>
            </Pressable>
            <Pressable
              onPress={onDismiss}
              accessibilityRole="button"
              className="rounded-full px-4 py-2 active:opacity-70"
            >
              <Text className="text-sm font-semibold text-danger">Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
