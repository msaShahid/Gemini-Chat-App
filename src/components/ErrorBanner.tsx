import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export function ErrorBanner({ message, onRetry, onDismiss }: ErrorBannerProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.message}>{message}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onRetry} accessibilityRole="button">
          <Text style={styles.action}>Try again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDismiss} accessibilityRole="button">
          <Text style={styles.action}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.bubble,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    backgroundColor: colors.errorBackground,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.errorText,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.sm,
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.errorText,
  },
});
