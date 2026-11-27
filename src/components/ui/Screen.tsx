import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps {
  title: string;
  subtitle?: string;
  /** Element shown at the right of the title (e.g. an avatar or action). */
  headerRight?: ReactNode;
  /** Small text shown above the title (e.g. a greeting or date). */
  eyebrow?: string;
  /** When provided, a back button is shown above the title (used for pushed screens). */
  onBack?: () => void;
  children: ReactNode;
}

/**
 * Standard layout for tab screens: safe-area aware, scrollable, and centred
 * with a max width so it looks right on phones, tablets and the web.
 * Uses the same paper background and max-w-3xl column as the chat screen.
 */
export function Screen({ title, subtitle, headerRight, eyebrow, onBack, children }: ScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-paper">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="w-full max-w-3xl self-center px-5 pb-10"
        contentContainerStyle={{ paddingTop: insets.top + 16 }}
        showsVerticalScrollIndicator={false}
      >
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            className="mb-4 h-10 w-10 items-center justify-center rounded-full border border-line bg-card active:opacity-60"
          >
            <Text className="text-lg font-semibold text-ink">←</Text>
          </Pressable>
        ) : null}

        <View className="mb-6 flex-row items-center justify-between gap-4">
          <View className="flex-1">
            {eyebrow ? (
              <Text className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-brand">
                {eyebrow}
              </Text>
            ) : null}
            <Text accessibilityRole="header" className="text-3xl font-bold tracking-tight text-ink">
              {title}
            </Text>
            {subtitle ? <Text className="mt-1 text-base leading-6 text-muted">{subtitle}</Text> : null}
          </View>
          {headerRight}
        </View>

        <View className="gap-6">{children}</View>
      </ScrollView>
    </View>
  );
}
