# Gemini Chat

A simple, clean AI chat app built with **React Native**, **Expo** and **TypeScript**, powered by the **Google Gemini API**. It uses only built-in React Native components and the built-in `fetch()` API, with no extra libraries and no navigation packages.

## Features

- Welcome screen with tappable example prompts
- Chat interface with separate user and AI message bubbles
- Multiline message input with a send button (disabled when empty or while a reply is loading)
- Animated typing indicator while Gemini is replying
- Auto-scroll to the latest message
- Conversation history kept for the current app session, so Gemini remembers earlier messages
- "New chat" button in the header
- Clear error messages (invalid key, rate limit, no internet, timeout, blocked or empty reply) with a "Try again" button
- Keyboard-aware layout so the input stays visible

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React Native 0.88 with Expo SDK 58 |
| Language | TypeScript (strict mode) |
| AI | Google Gemini API (`generateContent` REST endpoint) |
| Networking | Built-in `fetch()` |
| Styling | `StyleSheet.create()` |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS)
- The [Expo Go](https://expo.dev/go) app on your phone, or an Android emulator / iOS simulator
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Install and run

```bash
git clone https://github.com/msaShahid/Gemini-Chat-App.git
cd Gemini-Chat-App
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
App.tsx                       Main screen: header, message list, input
index.ts                      Expo entry point
src/
  config/env.ts               Reads the API key and model name from env variables
  types/chat.ts               ChatMessage and ChatRole types
  services/gemini.ts          Gemini API call and error handling
  hooks/useChat.ts            Conversation state: send, retry, new chat
  hooks/useKeyboardVisible.ts Tracks whether the keyboard is open
  theme.ts                    Colors, spacing and safe-area padding
  components/
    Header.tsx                App name and "New chat" button
    WelcomeScreen.tsx         Empty-state screen with example prompts
    MessageBubble.tsx         One user or AI message
    TypingIndicator.tsx       Animated dots while waiting for a reply
    ChatInput.tsx             Multiline input and send button
    ErrorBanner.tsx           Error message with retry and dismiss
```

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
| Input or header sits too high or low | Adjust the `safeArea` values in `src/theme.ts`. |

Check types any time with:

```bash
npx tsc --noEmit
```

## Security note

Variables starting with `EXPO_PUBLIC_` are bundled into the app, so anyone who has the app can extract the key. This setup is fine for learning and personal projects. For a published app, send requests through your own backend and keep the key on the server.

## License

See the [LICENSE](LICENSE) file.
