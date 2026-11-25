import { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

const STEP_MS = 350;
const STAGGER_MS = 150;
const DOT_DELAYS = [0, STAGGER_MS, STAGGER_MS * 2];
const MAX_DELAY = STAGGER_MS * 2;

// One dot that fades in and out. The trailing delay keeps all three dots on the
// same cycle length so they stay in sync.
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

  return <Animated.View style={[styles.dot, { opacity }]} />;
}

/** Three animated dots in an AI-style bubble, shown while Gemini is replying. */
export function TypingIndicator() {
  return (
    <View style={styles.row} accessibilityLabel="Gemini is typing" accessibilityRole="progressbar">
      <View style={styles.bubble}>
        {DOT_DELAYS.map((delay) => (
          <Dot key={delay} delay={delay} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: spacing.md,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.bubble,
    borderBottomLeftRadius: 6,
    backgroundColor: colors.surface,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
  },
});
