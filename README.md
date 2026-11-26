# Gemini Chat

A simple, clean AI chat app built with **React Native**, **Expo** and **TypeScript**, styled with **Tailwind CSS (NativeWind)** and powered by the **Google Gemini API**. It uses the built-in `fetch()` API and **Expo Router** for file-based navigation.

## Features

- **Home** screen with a greeting, a "Start / Continue chat" hero, quick prompts and shortcuts
- **Dashboard** with live stats for the current chat session plus weekly summary cards, an activity chart, topic breakdown and recent conversations (labelled "Sample" until chat history is saved)
- **Profile** with user details, assistant settings (model, API key status), conversation actions and app info
- Bottom tab navigation between Home, Dashboard and Profile; the chat opens on top with a back button
- Welcome screen with tappable example prompts
- Chat interface with separate user and AI message bubbles
- Multiline message input with a send button (disabled when empty or while a reply is loading)
- Animated typing indicator while Gemini is replying
- Auto-scroll to the latest message
- Conversation history kept for the current app session, so Gemini remembers earlier messages
- "New chat" button in the header
- Clear error messages (invalid key, rate limit, no internet, timeout, blocked or empty reply) with a "Try again" button
- Keyboard-aware layout: the input bar moves up and stays right above the keyboard on iOS and Android
- Modern, responsive design with proper safe-area handling and a centered, width-limited layout on tablets and web

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React Native 0.88 with Expo SDK 58 |
| Language | TypeScript (strict mode) |
| AI | Google Gemini API (`generateContent` REST endpoint) |
| Networking | Built-in `fetch()` |
| Styling | NativeWind v4 (Tailwind CSS v3) |
| Navigation | Expo Router (tabs + stack) |
| Safe areas | `react-native-safe-area-context` |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android emulator / iOS simulator
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Install and run

```bash
git clone https://github.com/<your-username>/gemini-chat.git
cd gemini-chat
npm install
```

### Add your API key

1. Copy the example file to a new file named `.env.local` in the project root:

   ```bash
   # macOS / Linux
   cp .env.example .env.local

   # Windows (PowerShell)
   Copy-Item .env.example .env.local
   ```

2. Open `.env.local` and paste your key. Use no quotes and no spaces:

   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_real_key_here
   ```

3. (Optional) Choose a different Gemini model:

   ```
   EXPO_PUBLIC_GEMINI_MODEL=gemini-3.5-flash-lite
   ```

   If this line is left out, the app uses `gemini-3.8-flash`.

`.env.local` is listed in `.gitignore`, so your key is not committed. **Never commit your real key.**

### Start the app

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android) or `i` (iOS simulator). After changing `.env.local`, restart with a cleared cache:

```bash
npx expo start -c
```

## Project structure

```
app/                          Expo Router routes (every file is a screen)
  _layout.tsx                 Root stack, global.css import, shared chat state
  (tabs)/_layout.tsx          Bottom tabs: Home, Dashboard, Profile
  (tabs)/index.tsx            Home screen  (/)
  (tabs)/dashboard.tsx        Dashboard    (/dashboard)
  (tabs)/profile.tsx          Profile      (/profile)
  chat.tsx                    Gemini chat  (/chat), pushed above the tabs
App.tsx, index.ts             Legacy single-screen entry (not used by Expo Router)
global.css                    Tailwind directives (imported by app/_layout.tsx)
tailwind.config.js            Tailwind setup (colours come from src/constants/colors.json)
babel.config.js               Babel preset for NativeWind
metro.config.js               Metro setup for NativeWind
nativewind-env.d.ts           TypeScript support for the className prop
src/
  config/env.ts               Reads the API key and model name from env variables
  constants/colors.json       Colour tokens shared by Tailwind and the tab bar
  context/ChatContext.tsx     Shares one conversation across all screens
  data/                       Profile details, prompts and sample dashboard data
  screens/ChatScreen.tsx      The full chat UI used by /chat
  types/chat.ts               ChatMessage and ChatRole types
  services/gemini.ts          Gemini API call and error handling
  hooks/useChat.ts            Conversation state: send, retry, new chat
  hooks/useSessionStats.ts    Live numbers derived from the conversation
  hooks/useKeyboardAvoidance.ts Lifts the screen above the keyboard
  hooks/useKeyboardVisible.ts Tracks whether the keyboard is open
  utils/keyboard.ts           Pure keyboard maths used by the hook
  components/
    ui/                       Design system: Screen, Card, Button, Badge, Avatar,
                              StatCard, ListRow, ProgressBar, SectionHeader, tab icons
    dashboard/ActivityChart.tsx  Tap-to-inspect bar chart (no chart library)
    Header.tsx                App name, optional back button, "New chat" button
    WelcomeScreen.tsx         Empty-state screen with example prompts
    MessageBubble.tsx         One user or AI message
    TypingIndicator.tsx       Animated dots while waiting for a reply
    ChatInput.tsx             Multiline input and send button
    ErrorBanner.tsx           Error message with retry and dismiss
```

To change the name and details shown on Home and Profile, edit `src/data/profile.ts`. Dashboard sample figures live in `src/data/dashboard.ts`.

## Styling and design

All styling uses Tailwind classes through the `className` prop. The colour palette is defined once in `src/constants/colors.json` (used by `tailwind.config.js` and by the tab bar):

| Token | Used for |
| --- | --- |
| `paper` | App background |
| `card` | AI bubbles, input box, suggestion cards |
| `ink` | Primary text |
| `muted` | Secondary text |
| `line` | Borders and dividers |
| `brand` | User bubbles, send button, accents |
| `success` | Positive trends, "Connected" badge |
| `danger` | Error banner, negative trends |

Change a value there (for example `brand`) and the whole app updates.

## How keyboard handling works

React Native's built-in `KeyboardAvoidingView` does not work reliably on Android in Expo apps, because Expo draws them edge-to-edge and Android then reports the keyboard position as the bottom of the screen. Instead, `useKeyboardAvoidance` uses the keyboard's reported height, measures where the screen container ends, and adds matching `paddingBottom` so the message list shrinks and the input bar sits just above the keyboard. If the system has already resized the window, no extra padding is added. Dragging the message list dismisses the keyboard.

## How it works

1. You send a message. It is added to the conversation and the typing indicator appears.
2. `sendChatMessage()` in `src/services/gemini.ts` sends the whole conversation to Gemini, so it can answer in context.
3. The reply is added as an AI bubble. If the request fails, a friendly error appears with a "Try again" button.
4. "New chat" clears the conversation and ignores any reply that is still on its way.

## Troubleshooting

| Problem | What to try |
| --- | --- |
| "Missing API key" | Check that `.env.local` exists in the project root (not `.env.local.txt`) and restart with `npx expo start -c`. |
| "API key is not valid" | Re-copy the key from AI Studio. Make sure there are no quotes, spaces or leftover placeholder text. |
| "Gemini is temporarily unavailable" (503) | The model is busy. Wait and try again, or set `EXPO_PUBLIC_GEMINI_MODEL=gemini-3.5-flash-lite`. |
| "Too many requests" (429) | You hit the free-tier rate limit. Wait a minute and try again. |
| "Model was not found" | Check the model name in `.env.local` against Google's [models list](https://ai.google.dev/gemini-api/docs/models). |
| Input still hidden behind the keyboard | Restart with `npx expo start -c` and reload the app. If it persists, check that `src/screens/ChatScreen.tsx` still uses `useKeyboardAvoidance` and has no `KeyboardAvoidingView`. |
| Styles look missing or unstyled | Restart with a cleared cache: `npx expo start -c`. Also check that `app/_layout.tsx` still has `import '../global.css'`. |
| A new Tailwind class has no effect | Class names must be written out in full (for example `bg-brand`), not built from pieces like `` `bg-${color}` ``. |

Check types any time with:

```bash
npx tsc --noEmit
```

## Security note

Variables starting with `EXPO_PUBLIC_` are bundled into the app, so anyone who has the app can extract the key. This setup is fine for learning and personal projects. For a published app, send requests through your own backend and keep the key on the server.

## License

See the [LICENSE](LICENSE) file.
