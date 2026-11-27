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
  /** Topic name shown on the conversation detail screen. */
  topicLabel: string;
  title: string;
  detail: string;
  time: string;
  /** One-line summary shown on the conversation detail screen. */
  summary: string;
  /** Prompt sent when the user continues this conversation in the chat. */
  prompt: string;
  /** A short excerpt of the conversation for the detail screen. */
  preview: { role: 'user' | 'model'; text: string }[];
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    topic: 'L',
    topicLabel: 'Learning',
    title: 'Quantum computing basics',
    detail: '12 messages',
    time: '2h ago',
    summary: 'Qubits, superposition and why quantum computers suit certain problems.',
    prompt: 'Explain quantum computing in simple terms',
    preview: [
      { role: 'user', text: 'Explain quantum computing in simple terms' },
      {
        role: 'model',
        text: 'Classical computers use bits that are either 0 or 1. Quantum computers use qubits, which can be in a mix of both at once…',
      },
      { role: 'user', text: 'What problems is it actually good at?' },
    ],
  },
  {
    id: '2',
    topic: 'W',
    topicLabel: 'Writing',
    title: 'Deadline extension email',
    detail: '6 messages',
    time: 'Yesterday',
    summary: 'A short, polite email asking a manager for two extra days.',
    prompt: 'Draft a polite email asking for a deadline extension',
    preview: [
      { role: 'user', text: 'Draft a polite email asking for a deadline extension' },
      {
        role: 'model',
        text: 'Subject: Request for a short extension\n\nHi Priya, I wanted to ask whether I could have until Thursday to finish…',
      },
      { role: 'user', text: 'Make it a bit shorter' },
    ],
  },
  {
    id: '3',
    topic: 'C',
    topicLabel: 'Cooking',
    title: '20-minute dinner ideas',
    detail: '9 messages',
    time: 'Mon',
    summary: 'Quick vegetarian dinners using pantry staples.',
    prompt: 'Suggest a healthy dinner I can cook in 20 minutes',
    preview: [
      { role: 'user', text: 'Suggest a healthy dinner I can cook in 20 minutes' },
      {
        role: 'model',
        text: 'Try a chickpea and spinach stir-fry: sauté garlic, add chickpeas, spinach, cumin and a squeeze of lemon…',
      },
      { role: 'user', text: 'Any ideas without chickpeas?' },
    ],
  },
];

/** Looks up a recent conversation by the `id` segment of /conversation/[id]. */
export function getConversationById(id: string | undefined): ActivityItem | undefined {
  return RECENT_ACTIVITY.find((item) => item.id === id);
}
