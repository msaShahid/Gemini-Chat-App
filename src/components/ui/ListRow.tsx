import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

interface ListRowProps {
  title: string;
  subtitle?: string;
  /** Text shown on the right (e.g. a setting's current value). */
  value?: string;
  /** Custom element on the right, used instead of `value`. */
  trailing?: ReactNode;
  /** Single letter or glyph shown in a rounded tile on the left. */
  icon?: string;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  /** Draws a divider under the row (omit on the last row in a group). */
  divider?: boolean;
  accessibilityHint?: string;
}

/**
 * A settings-style row. Becomes a pressable button with a chevron when
 * `onPress` is given; otherwise it is a static, read-only row.
 */
export function ListRow({
  title,
  subtitle,
  value,
  trailing,
  icon,
  onPress,
  disabled = false,
  destructive = false,
  divider = false,
  accessibilityHint,
}: ListRowProps) {
  const content = (
    <View className={`flex-row items-center gap-3 px-4 py-3.5 ${divider ? 'border-b border-line' : ''}`}>
      {icon ? (
        <View
          className={`h-9 w-9 items-center justify-center rounded-xl ${
            destructive ? 'bg-danger-soft' : 'bg-brand-soft'
          }`}
        >
          <Text className={`text-sm font-bold ${destructive ? 'text-danger' : 'text-brand'}`}>{icon}</Text>
        </View>
      ) : null}

      <View className="flex-1">
        <Text className={`text-base font-medium ${destructive ? 'text-danger' : 'text-ink'}`}>{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-sm text-muted">{subtitle}</Text> : null}
      </View>

      {trailing ?? (value ? <Text className="max-w-[50%] text-sm text-muted" numberOfLines={1}>{value}</Text> : null)}
      {onPress ? <Text className="text-lg text-muted">›</Text> : null}
    </View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      className={disabled ? 'opacity-40' : 'active:bg-paper'}
    >
      {content}
    </Pressable>
  );
}

/** Groups ListRows inside a rounded card, like iOS / Android settings lists. */
export function ListGroup({ children }: { children: ReactNode }) {
  return <View className="overflow-hidden rounded-3xl border border-line bg-card">{children}</View>;
}
