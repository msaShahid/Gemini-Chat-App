import { useRouter } from 'expo-router';
import { Text, useWindowDimensions, View } from 'react-native';
import { ActivityChart } from '../../src/components/dashboard/ActivityChart';
import {
  Badge,
  Button,
  Card,
  ListGroup,
  ListRow,
  ProgressBar,
  Screen,
  SectionHeader,
  StatCard,
  type BadgeTone,
} from '../../src/components/ui';
import {
  RECENT_ACTIVITY,
  TOPIC_BREAKDOWN,
  WEEKLY_ACTIVITY,
  WEEKLY_STATS,
  type WeeklyStat,
} from '../../src/data/dashboard';
import { useSessionStats, type SessionStatus } from '../../src/hooks/useSessionStats';

const STATUS: Record<SessionStatus, { label: string; tone: BadgeTone }> = {
  idle: { label: 'Ready', tone: 'success' },
  thinking: { label: 'Thinking…', tone: 'brand' },
  error: { label: 'Needs attention', tone: 'danger' },
};

const SampleBadge = () => <Badge label="Sample" tone="neutral" />;

/** Splits items into rows of `size` so the grid can switch between 2 and 4 columns. */
function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

function SessionMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <View className="flex-1">
      <Text className="text-2xl font-bold tracking-tight text-ink">{value}</Text>
      <Text className="mt-0.5 text-xs text-muted">{label}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const stats = useSessionStats();
  const status = STATUS[stats.status];

  const columns = width >= 768 ? 4 : 2;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <Screen eyebrow={today} title="Dashboard" subtitle="Your Gemini activity at a glance.">
      {/* Live: this session */}
      <Card>
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-lg font-bold tracking-tight text-ink">This session</Text>
          <Badge label={status.label} tone={status.tone} dot />
        </View>

        <View className="flex-row gap-3 rounded-2xl bg-paper p-4">
          <SessionMetric label="Sent" value={stats.sentCount} />
          <View className="w-px bg-line" />
          <SessionMetric label="Replies" value={stats.replyCount} />
          <View className="w-px bg-line" />
          <SessionMetric label="Avg. reply words" value={stats.avgReplyWords} />
        </View>

        <Text className="mb-4 mt-4 text-sm leading-5 text-muted">
          {stats.hasConversation
            ? `You've written ${stats.wordsWritten} words so far. Conversations reset when you start a new chat.`
            : 'No messages yet. Start a chat and these numbers update live.'}
        </Text>

        <Button
          variant={stats.hasConversation ? 'secondary' : 'primary'}
          label={stats.hasConversation ? 'Open chat' : 'Start a chat'}
          trailing="→"
          onPress={() => router.push('/chat')}
        />
      </Card>

      {/* Sample: weekly summary cards */}
      <View>
        <SectionHeader title="This week" accessory={<SampleBadge />} />
        <View className="gap-3">
          {chunk<WeeklyStat>(WEEKLY_STATS, columns).map((row) => (
            <View key={row.map((s) => s.label).join()} className="flex-row gap-3">
              {row.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Sample: activity chart */}
      <Card>
        <SectionHeader title="Messages per day" accessory={<SampleBadge />} />
        <ActivityChart data={WEEKLY_ACTIVITY} />
      </Card>

      {/* Sample: topic breakdown */}
      <Card>
        <SectionHeader title="Top topics" accessory={<SampleBadge />} />
        <View className="gap-4">
          {TOPIC_BREAKDOWN.map((topic) => (
            <View key={topic.label}>
              <View className="mb-2 flex-row justify-between">
                <Text className="text-sm font-medium text-ink">{topic.label}</Text>
                <Text className="text-sm font-semibold text-ink">{topic.percent}%</Text>
              </View>
              <ProgressBar percent={topic.percent} />
            </View>
          ))}
        </View>
      </Card>

      {/* Sample: recent conversations */}
      <View>
        <SectionHeader title="Recent conversations" accessory={<SampleBadge />} />
        <ListGroup>
          {RECENT_ACTIVITY.map((item, index) => (
            <ListRow
              key={item.id}
              icon={item.topic}
              title={item.title}
              subtitle={item.detail}
              value={item.time}
              onPress={() =>
                router.push({ pathname: '/conversation/[id]', params: { id: item.id } })
              }
              accessibilityHint="Opens the conversation details"
              divider={index < RECENT_ACTIVITY.length - 1}
            />
          ))}
        </ListGroup>
      </View>
    </Screen>
  );
}
