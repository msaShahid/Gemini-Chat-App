import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, safeArea, spacing } from '../theme';

interface HeaderProps {
  onNewChat: () => void;
  newChatDisabled: boolean;
}

export function Header({ onNewChat, newChatDisabled }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gemini Chat</Text>
      <TouchableOpacity
        style={[styles.button, newChatDisabled && styles.buttonDisabled]}
        onPress={onNewChat}
        disabled={newChatDisabled}
        accessibilityRole="button"
        accessibilityLabel="Start a new chat"
      >
        <Text style={styles.buttonText}>+ New chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: safeArea.top + spacing.sm,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
});
