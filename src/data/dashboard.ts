// Sample usage data for the Dashboard. Conversations are not saved between app
// launches yet, so these figures are illustrative and are labelled "Sample" in
// the UI. Replace them with real numbers once chat history is persisted.
// (The "This session" figures on the Dashboard are live, not sample data.)

export type Trend = 'up' | 'down' | 'flat';

export interface WeeklyStat {
  label: string;
  value: string;
  change: string;
  trend: Trend;
  /** true when a downward trend is good news (e.g. response time). */
  lowerIsBetter?: boolean;
}

export const WEEKLY_STATS: WeeklyStat[] = [
  { label: 'Conversations', value: '24', change: '+12%', trend: 'up' },
  { label: 'Messages', value: '318', change: '+8%', trend: 'up' },
  { label: 'Avg. response', value: '1.4s', change: '−0.2s', trend: 'down', lowerIsBetter: true },
  { label: 'Active days', value: '6/7', change: 'Same', trend: 'flat' },
];

export interface DailyActivity {
  day: string;
  messages: number;
}

export const WEEKLY_ACTIVITY: DailyActivity[] = [
  { day: 'Mon', messages: 42 },
  { day: 'Tue', messages: 58 },
  { day: 'Wed', messages: 35 },
  { day: 'Thu', messages: 71 },
  { day: 'Fri', messages: 49 },
  { day: 'Sat', messages: 22 },
  { day: 'Sun', messages: 41 },
];

export interface TopicShare {
  label: string;
  percent: number;
}

// Topics mirror the suggestion categories on the Home screen.
export const TOPIC_BREAKDOWN: TopicShare[] = [
  { label: 'Learning', percent: 42 },
  { label: 'Writing', percent: 31 },
  { label: 'Cooking', percent: 15 },
  { label: 'Other', percent: 12 },
];

export interface ActivityItem {
  id: string;
  /** Topic initial shown in the row's icon tile (matches the Home prompt labels). */
  topic: string;
  title: string;
  detail: string;
  time: string;
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: '1', topic: 'L', title: 'Quantum computing basics', detail: '12 messages', time: '2h ago' },
  { id: '2', topic: 'W', title: 'Deadline extension email', detail: '6 messages', time: 'Yesterday' },
  { id: '3', topic: 'C', title: '20-minute dinner ideas', detail: '9 messages', time: 'Mon' },
];
