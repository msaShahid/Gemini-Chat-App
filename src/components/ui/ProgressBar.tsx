import { View } from 'react-native';

interface ProgressBarProps {
  /** 0–100 */
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View
      className="h-2 w-full overflow-hidden rounded-full bg-brand-soft"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
    >
      <View className="h-full rounded-full bg-brand" style={{ width: `${clamped}%` }} />
    </View>
  );
}
