import { Link, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Avatar, Badge, Button, Card, Screen, SectionHeader } from '../../src/components/ui';
import { GEMINI_MODEL } from '../../src/config/env';
import { useChatSession } from '../../src/context/ChatContext';
import { getFirstName, USER_PROFILE } from '../../src/data/profile';
import { SUGGESTIONS } from '../../src/data/suggestions';
import { useSessionStats } from '../../src/hooks/useSessionStats';

function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const SHORTCUTS = [
  {
    href: '/dashboard',
    eyebrow: 'Insights',
    title: 'Dashboard',
    description: 'Your activity, usage and recent chats.',
  },
  {
    href: '/profile',
    eyebrow: 'Account',
    title: 'Profile',
    description: 'Your details, assistant settings and help.',
  },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const { sendMessage, isLoading } = useChatSession();
  const stats = useSessionStats();

  const openChat = () => router.push('/chat');

  const askSuggestion = (text: string) => {
    sendMessage(text);
    openChat();
  };

  return (
    <Screen
      eyebrow={getGreeting()}
      title={`Hi, ${getFirstName(USER_PROFILE.name)}`}
      subtitle="What would you like to explore today?"
      headerRight={
        <Link href="/profile" asChild>
          <Pressable accessibilityRole="button" accessibilityLabel="Open profile" className="active:opacity-70">
            <Avatar name={USER_PROFILE.name} size="sm" />
          </Pressable>
        </Link>
      }
    >
      {/* Hero: primary call to action */}
      <View className="overflow-hidden rounded-3xl bg-brand p-6">
        {/* Decorative circles for depth */}
        <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <View className="absolute -bottom-16 right-12 h-32 w-32 rounded-full bg-white/5" />

        <View className="mb-5 flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white">
            <Text className="text-xl font-bold text-brand">G</Text>
          </View>
          <View className="flex-row items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
            <View className="h-1.5 w-1.5 rounded-full bg-white" />
            <Text className="text-xs font-semibold text-white">{GEMINI_MODEL}</Text>
          </View>
        </View>

        <Text className="text-2xl font-bold leading-8 tracking-tight text-white">
          {stats.hasConversation ? 'Pick up where you left off' : 'Your AI assistant, ready when you are'}
        </Text>
        <Text className="mt-2 text-base leading-6 text-white/80" numberOfLines={2}>
          {stats.hasConversation && stats.lastUserMessage
            ? `Last asked: “${stats.lastUserMessage}”`
            : 'Ask questions, draft writing and plan meals with Google Gemini.'}
        </Text>

        <View className="mt-6">
          <Button
            variant="inverse"
            label={stats.hasConversation ? `Continue chat · ${stats.totalMessages}` : 'Start chatting'}
            accessibilityLabel={stats.hasConversation ? 'Continue chat' : 'Start chatting'}
            trailing="→"
            onPress={openChat}
          />
        </View>
      </View>

      {/* Quick prompts: reuse the chat's suggestions */}
      <View>
        <SectionHeader title="Try asking" />
        <View className="gap-3">
          {SUGGESTIONS.map((suggestion) => (
            <Pressable
              key={suggestion.text}
              onPress={() => askSuggestion(suggestion.text)}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityHint="Sends this prompt and opens the chat"
              className="flex-row items-center gap-3 rounded-2xl border border-line bg-card p-4 active:bg-brand-soft"
            >
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-brand-soft">
                <Text className="text-sm font-bold text-brand">{suggestion.label[0]}</Text>
              </View>
              <View className="flex-1">
                <Text className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-brand">
                  {suggestion.label}
                </Text>
                <Text className="text-base leading-6 text-ink">{suggestion.text}</Text>
              </View>
              <Text className="text-lg text-muted">→</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Shortcuts to the other tabs */}
      <View>
        <SectionHeader title="Explore" />
        <View className="flex-row flex-wrap gap-3">
          {SHORTCUTS.map((shortcut) => (
            <Link key={shortcut.href} href={shortcut.href} asChild>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open ${shortcut.title}`}
                className="min-w-[150px] flex-1 rounded-3xl border border-line bg-card p-5 active:bg-brand-soft"
              >
                <Text className="text-[11px] font-semibold uppercase tracking-widest text-brand">
                  {shortcut.eyebrow}
                </Text>
                <Text className="mt-2 text-lg font-bold tracking-tight text-ink">{shortcut.title}</Text>
                <Text className="mt-1 text-sm leading-5 text-muted">{shortcut.description}</Text>
                <Text className="mt-4 text-base font-semibold text-brand">Open →</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>

      {/* Tip */}
      <Card className="flex-row gap-4">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-paper">
          <Text className="text-base font-bold text-ink">i</Text>
        </View>
        <View className="flex-1">
          <View className="mb-1 flex-row items-center gap-2">
            <Text className="text-base font-semibold text-ink">Tip</Text>
            <Badge label="Pro move" tone="brand" />
          </View>
          <Text className="text-sm leading-5 text-muted">
            Gemini remembers the whole conversation, so follow up with “shorter”, “add an example”
            or “explain it differently” to refine an answer.
          </Text>
        </View>
      </Card>
    </Screen>
  );
}
