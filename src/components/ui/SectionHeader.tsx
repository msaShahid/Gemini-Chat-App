import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  /** Optional element after the title, e.g. a <Badge>. */
  accessory?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, accessory, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <Text accessibilityRole="header" className="text-lg font-bold tracking-tight text-ink">
          {title}
        </Text>
        {accessory}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8} className="active:opacity-60">
          <Text className="text-sm font-semibold text-brand">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
