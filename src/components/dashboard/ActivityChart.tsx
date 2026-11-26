import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { DailyActivity } from '../../data/dashboard';

interface ActivityChartProps {
  data: DailyActivity[];
  /** Plot height in dp (bars only, labels excluded). */
  height?: number;
}

/**
 * Single-series bar chart built from Views (no chart library).
 * One brand hue, thin bars with rounded tops on a shared baseline, and only the
 * selected bar is labelled. Tap a bar to inspect its value (touch's "hover").
 */
export function ActivityChart({ data, height = 140 }: ActivityChartProps) {
  const max = Math.max(1, ...data.map((d) => d.messages));
  const peakIndex = data.findIndex((d) => d.messages === max);
  const [selected, setSelected] = useState(peakIndex);
  const active = data[selected];

  return (
    <View>
      <View className="mb-4 flex-row items-baseline gap-2">
        <Text className="text-2xl font-bold tracking-tight text-ink">{active?.messages ?? 0}</Text>
        <Text className="text-sm text-muted">
          messages on {active?.day}
          {selected === peakIndex ? ' · busiest day' : ''}
        </Text>
      </View>

      <View className="flex-row items-end border-b border-line" style={{ height }}>
        {data.map((item, index) => {
          const isActive = index === selected;
          const barHeight = Math.max(4, Math.round((item.messages / max) * (height - 8)));
          return (
            <Pressable
              key={item.day}
              onPress={() => setSelected(index)}
              accessibilityRole="button"
              accessibilityLabel={`${item.day}: ${item.messages} messages`}
              accessibilityState={{ selected: isActive }}
              // Hit target is the full column, much bigger than the bar itself.
              className="h-full flex-1 items-center justify-end"
            >
              <View
                className={`w-4 rounded-t ${isActive ? 'bg-brand' : 'bg-brand-soft'}`}
                style={{ height: barHeight }}
              />
            </Pressable>
          );
        })}
      </View>

      <View className="mt-2 flex-row">
        {data.map((item, index) => (
          <Text
            key={item.day}
            className={`flex-1 text-center text-xs ${index === selected ? 'font-semibold text-ink' : 'text-muted'}`}
          >
            {item.day}
          </Text>
        ))}
      </View>
    </View>
  );
}
