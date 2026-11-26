import { Text, View } from 'react-native';

export type BadgeTone = 'brand' | 'neutral' | 'success' | 'danger';

// Class names are written out in full so Tailwind can find them at build time.
const TONES: Record<BadgeTone, { box: string; text: string; dot: string }> = {
  brand: { box: 'bg-brand-soft', text: 'text-brand', dot: 'bg-brand' },
  neutral: { box: 'border border-line bg-paper', text: 'text-muted', dot: 'bg-muted' },
  success: { box: 'bg-success-soft', text: 'text-success', dot: 'bg-success' },
  danger: { box: 'bg-danger-soft', text: 'text-danger', dot: 'bg-danger' },
};

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  /** Shows a small status dot before the label. */
  dot?: boolean;
}

export function Badge({ label, tone = 'neutral', dot = false }: BadgeProps) {
  const style = TONES[tone];
  return (
    <View className={`flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1 ${style.box}`}>
      {dot ? <View className={`h-1.5 w-1.5 rounded-full ${style.dot}`} /> : null}
      <Text className={`text-xs font-semibold ${style.text}`}>{label}</Text>
    </View>
  );
}
