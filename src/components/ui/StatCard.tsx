import { Text, View } from 'react-native';
import type { Trend } from '../../data/dashboard';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: Trend;
  /** When true, a downward trend is shown as good news (green). */
  lowerIsBetter?: boolean;
  caption?: string;
}

const ARROWS: Record<Trend, string> = { up: '▲', down: '▼', flat: '–' };

type ChipTone = 'good' | 'bad' | 'neutral';

// Arrow + text always accompany the colour, so meaning never relies on colour alone.
const CHIP_TONES: Record<ChipTone, { box: string; text: string }> = {
  good: { box: 'bg-success-soft', text: 'text-success' },
  bad: { box: 'bg-danger-soft', text: 'text-danger' },
  neutral: { box: 'bg-paper', text: 'text-muted' },
};

/** Compact metric tile: label, big value, and an optional trend chip. */
export function StatCard({ label, value, change, trend = 'flat', lowerIsBetter, caption }: StatCardProps) {
  const tone: ChipTone =
    trend === 'flat' ? 'neutral' : (trend === 'down') === Boolean(lowerIsBetter) ? 'good' : 'bad';
  const { box: chipBox, text: chipText } = CHIP_TONES[tone];

  return (
    <View
      className="flex-1 rounded-3xl border border-line bg-card p-4"
      accessible
      accessibilityLabel={`${label}: ${value}${change ? `, ${change} versus last week` : ''}`}
    >
      <Text className="text-sm font-medium text-muted">{label}</Text>
      <Text className="mt-2 text-3xl font-bold tracking-tight text-ink">{value}</Text>
      {change ? (
        <View className={`mt-3 flex-row items-center gap-1 self-start rounded-full px-2 py-0.5 ${chipBox}`}>
          <Text className={`text-[10px] ${chipText}`}>{ARROWS[trend]}</Text>
          <Text className={`text-xs font-semibold ${chipText}`}>{change}</Text>
        </View>
      ) : null}
      {caption ? <Text className="mt-3 text-xs text-muted">{caption}</Text> : null}
    </View>
  );
}
