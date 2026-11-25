import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../theme';

const SUGGESTIONS = [
  'Explain quantum computing in simple terms',
  'Draft a polite email asking for a deadline extension',
  'Suggest a healthy dinner I can cook in 20 minutes',
];

interface WelcomeScreenProps {
  onSelectSuggestion: (text: string) => void;
}

export function WelcomeScreen({ onSelectSuggestion }: WelcomeScreenProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>AI</Text>
      </View>
      <Text style={styles.title}>How can I help today?</Text>
      <Text style={styles.subtitle}>
        Ask me anything. Answers come from Google Gemini and I remember this conversation until you
        start a new chat.
      </Text>

      <View style={styles.suggestions}>
        {SUGGESTIONS.map((suggestion) => (
          <TouchableOpacity
            key={suggestion}
            style={styles.suggestion}
            onPress={() => onSelectSuggestion(suggestion)}
            accessibilityRole="button"
          >
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  badgeText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onAccent,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 420,
  },
  suggestions: {
    marginTop: spacing.xl,
    width: '100%',
    maxWidth: 420,
    gap: spacing.sm,
  },
  suggestion: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.bubble,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  suggestionText: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.text,
  },
});
