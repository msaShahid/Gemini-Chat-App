import { Pressable, ScrollView, Text, View } from 'react-native';
import { SUGGESTIONS } from '../data/suggestions';

interface WelcomeScreenProps {
  onSelectSuggestion: (text: string) => void;
}

export function WelcomeScreen({ onSelectSuggestion }: WelcomeScreenProps) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="w-full max-w-3xl grow justify-center self-center px-5 py-8"
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-6 h-16 w-16 items-center justify-center rounded-3xl bg-brand">
        <Text className="text-3xl font-bold text-white">G</Text>
      </View>

      <Text className="text-3xl font-bold leading-9 tracking-tight text-ink">
        What can I help you with?
      </Text>
      <Text className="mt-2 text-base leading-6 text-muted">
        Ask anything. Answers come from Google Gemini, and I remember this conversation until you
        start a new chat.
      </Text>

      <View className="mt-8 gap-3">
        {SUGGESTIONS.map((suggestion) => (
          <Pressable
            key={suggestion.text}
            onPress={() => onSelectSuggestion(suggestion.text)}
            accessibilityRole="button"
            className="flex-row items-center gap-3 rounded-2xl border border-line bg-card p-4 active:bg-brand-soft"
          >
            <View className="flex-1">
              <Text className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-brand">
                {suggestion.label}
              </Text>
              <Text className="text-base leading-6 text-ink">{suggestion.text}</Text>
            </View>
            <Text className="text-lg text-muted">→</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
