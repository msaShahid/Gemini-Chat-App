// Example prompts shown on the chat welcome screen and the Home screen.

export interface Suggestion {
  label: string;
  text: string;
}

export const SUGGESTIONS: Suggestion[] = [
  { label: 'Learn', text: 'Explain quantum computing in simple terms' },
  { label: 'Write', text: 'Draft a polite email asking for a deadline extension' },
  { label: 'Cook', text: 'Suggest a healthy dinner I can cook in 20 minutes' },
];
