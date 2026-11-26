import { useEffect, useRef } from 'react';
import { Animated, Platform, Text, View } from 'react-native';

const STEP_MS = 350;
const STAGGER_MS = 150;
const DOT_DELAYS = [0, STAGGER_MS, STAGGER_MS * 2];
const MAX_DELAY = STAGGER_MS * 2;

// One dot that fades in and out. The trailing delay keeps all three dots on the
// same cycle length so they stay in sync. Only the opacity is animated (via the
// style prop); the look of the dot comes from the Tailwind classes.
function Dot({ delay }: { delay: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const useNativeDriver = Platform.OS !== 'web';
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, { toValue: 1, duration: STEP_MS, useNativeDriver }),
        Animated.timing(opacity, { toValue: 0.3, duration: STEP_MS, useNativeDriver }),
        Animated.delay(MAX_DELAY - delay),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [delay, opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <View className="h-2 w-2 rounded-full bg-muted" />
    </Animated.View>
  );
}

/** Three animated dots in an AI-style bubble, shown while Gemini is replying. */
export function TypingIndicator() {
  return (
    <View
      className="mb-4 flex-row items-end gap-2.5"
      accessibilityLabel="Gemini is typing"
      accessibilityRole="progressbar"
    >
      <View className="h-8 w-8 items-center justify-center rounded-full bg-brand-soft">
        <Text className="text-xs font-bold text-brand">G</Text>
      </View>
      <View className="flex-row items-center gap-1.5 rounded-3xl rounded-bl-md border border-line bg-card px-4 py-4">
        {DOT_DELAYS.map((delay) => (
          <Dot key={delay} delay={delay} />
        ))}
      </View>
    </View>
  );
}
