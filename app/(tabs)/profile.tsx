import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { Alert, Platform, Text, View } from 'react-native';
import { Avatar, Badge, ListGroup, ListRow, Screen, SectionHeader } from '../../src/components/ui';
import { GEMINI_API_KEY, GEMINI_MODEL } from '../../src/config/env';
import { useChatSession } from '../../src/context/ChatContext';
import { USER_PROFILE } from '../../src/data/profile';
import { useSessionStats } from '../../src/hooks/useSessionStats';

const LINKS = {
  apiKey: 'https://aistudio.google.com/apikey',
  docs: 'https://ai.google.dev/gemini-api/docs',
};

const APP_VERSION = Constants.expoConfig?.version ?? '—';

function ProfileStat({ label, value }: { label: string; value: string | number }) {
  return (
    <View className="flex-1 items-center">
      <Text className="text-lg font-bold tracking-tight text-ink">{value}</Text>
      <Text className="mt-0.5 text-center text-xs text-muted">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { startNewChat } = useChatSession();
  const stats = useSessionStats();
  const hasApiKey = GEMINI_API_KEY.length > 0;

  const openLink = (url: string) => {
    void Linking.openURL(url).catch(() => {
      Alert.alert('Could not open link', url);
    });
  };

  const confirmClearChat = () => {
    // Alert buttons are not supported on web, so confirm with the browser dialog there.
    if (Platform.OS === 'web') {
      if (globalThis.confirm?.('Clear the current conversation?')) startNewChat();
      return;
    }
    Alert.alert('Clear conversation?', 'This removes all messages in the current chat.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: startNewChat },
    ]);
  };

  return (
    <Screen title="Profile" subtitle="Your account and assistant settings.">
      {/* Identity card */}
      <View className="overflow-hidden rounded-3xl border border-line bg-card">
        <View className="h-20 bg-brand-soft" />
        <View className="-mt-10 items-center px-5 pb-5">
          <Avatar name={USER_PROFILE.name} size="lg" />
          <Text className="mt-3 text-xl font-bold tracking-tight text-ink">{USER_PROFILE.name}</Text>
          <Text className="mt-0.5 text-sm text-muted">{USER_PROFILE.email}</Text>
          <View className="mt-3 flex-row gap-2">
            <Badge label={USER_PROFILE.plan} tone="brand" />
            <Badge label={USER_PROFILE.location} />
          </View>

          <View className="mt-5 w-full flex-row rounded-2xl bg-paper py-4">
            <ProfileStat label="Messages" value={stats.totalMessages} />
            <View className="w-px bg-line" />
            <ProfileStat label="Replies" value={stats.replyCount} />
            <View className="w-px bg-line" />
            <ProfileStat label="Member since" value={USER_PROFILE.memberSince.split(' ')[1] ?? '—'} />
          </View>
        </View>
      </View>

      <View>
        <SectionHeader title="Account" />
        <ListGroup>
          <ListRow icon="N" title="Name" value={USER_PROFILE.name} divider />
          <ListRow icon="@" title="Email" value={USER_PROFILE.email} divider />
          <ListRow icon="M" title="Member since" value={USER_PROFILE.memberSince} />
        </ListGroup>
      </View>

      <View>
        <SectionHeader title="Assistant" />
        <ListGroup>
          <ListRow icon="G" title="Model" value={GEMINI_MODEL} divider />
          <ListRow
            icon="K"
            title="API key"
            subtitle={hasApiKey ? 'Loaded from .env.local' : 'Not set in .env.local'}
            trailing={
              <Badge label={hasApiKey ? 'Connected' : 'Missing'} tone={hasApiKey ? 'success' : 'danger'} dot />
            }
            divider
          />
          <ListRow
            icon="+"
            title="Get an API key"
            subtitle="Google AI Studio"
            onPress={() => openLink(LINKS.apiKey)}
            accessibilityHint="Opens Google AI Studio in your browser"
          />
        </ListGroup>
      </View>

      <View>
        <SectionHeader title="Conversation" />
        <ListGroup>
          <ListRow
            icon="→"
            title={stats.hasConversation ? 'Continue chat' : 'Start a chat'}
            subtitle={stats.hasConversation ? `${stats.totalMessages} messages in this session` : undefined}
            onPress={() => router.push('/chat')}
            divider
          />
          <ListRow
            icon="D"
            title="View dashboard"
            subtitle="Activity and usage"
            onPress={() => router.navigate('/dashboard')}
            divider
          />
          <ListRow
            icon="×"
            title="Clear current chat"
            onPress={confirmClearChat}
            disabled={!stats.hasConversation}
            destructive
          />
        </ListGroup>
      </View>

      <View>
        <SectionHeader title="About" />
        <ListGroup>
          <ListRow
            icon="?"
            title="Gemini API docs"
            onPress={() => openLink(LINKS.docs)}
            accessibilityHint="Opens the documentation in your browser"
            divider
          />
          <ListRow icon="v" title="App version" value={APP_VERSION} />
        </ListGroup>
      </View>

      <Text className="text-center text-xs text-muted">
        Gemini Chat · Powered by Google Gemini
      </Text>
    </Screen>
  );
}
