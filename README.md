I've updated your README structure and added a complete Generate a New APK section with Windows PowerShell commands, build instructions, APK output location, and installation steps.

Writing

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

- [Node.js](<https://nodejs.org/>) (LTS)
- [Android Studio](<https://developer.android.com/studio>) (for local Android APK builds)
- Android SDK and Android NDK
- The [Expo Go](<https://expo.dev/go>) app on your phone, or an Android emulator / iOS simulator
- A free Gemini API key from [Google AI Studio](<https://aistudio.google.com/apikey>)

### Install and run

bash

```bash
git clone https://github.com/msaShahid/Gemini-Chat-App.git
cd Gemini-Chat-App
npm install
```

### Add your API key

1. Copy the example file to a new file named `.env.local` in the project root:**macOS / Linux:**
   bash
   ```bash
   cp .env.example .env.local
   ```
   **Windows (PowerShell):**
   powershell
   ```powershell
   Copy-Item .env.example .env.local
   ```
2. Open `.env.local` and paste your key. Use no quotes and no spaces:env
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=your_real_key_here
   ```
3. (Optional) Choose a different Gemini model:env
   ```env
   EXPO_PUBLIC_GEMINI_MODEL=gemini-3.5-flash-lite
   ```
   If this line is left out, the app uses `gemini-3.8-flash`.

`.env.local` is listed in `.gitignore`, so your key is not committed. **Never commit your real key.**

### Start the app

bash

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android) or `i` (iOS simulator).

After changing `.env.local`, restart with a cleared cache:

bash

```bash
npx expo start -c
```

---

## Generate a new Android APK

You can generate a release APK locally using Android Studio's Android SDK and Gradle.

### Prerequisites

Make sure you have:

- Android Studio installed
- Android SDK installed
- Android NDK `27.1.12297006`
- Java configured through Android Studio or Gradle

### Step 1. Install project dependencies

From the project root:

bash

```bash
npm install
```

### Step 2. Generate Android native project

If the `android` directory does not exist, generate it using:

bash

```bash
npx expo prebuild --platform android
```

If you have already generated and configured your Android project, you can skip this step.

**Note:** Running prebuild on an existing Android project can modify native files. Back up your native configuration before regenerating it.

### Step 3. Open the Android directory

**Windows (PowerShell):**

powershell

```powershell
cd android
```

**macOS / Linux:**

bash

```bash
cd android
```

### Step 4. Clean the previous build

**Windows:**

powershell

```powershell
.\gradlew clean
```

**macOS / Linux:**

bash

```bash
./gradlew clean
```

### Step 5. Generate the release APK

**Windows (PowerShell):**

powershell

```powershell
.\gradlew assembleRelease
```

**macOS / Linux:**

bash

```bash
./gradlew assembleRelease
```

Wait until Gradle finishes building the application.

A successful build displays:

text

```text
BUILD SUCCESSFUL
```

### Step 6. Find your APK

After the build completes, your APK will be generated at:

text

```text
android/app/build/outputs/apk/release/app-release.apk
```

On Windows, the full path will look like:

text

```text
D:\Shahid\2026\my-app\android\app\build\outputs\apk\release\app-release.apk
```

### Step 7. Install the APK on your Android phone

1. Transfer `app-release.apk` to your Android phone.
2. Open the APK file.
3. Allow installation from this source if Android asks.
4. Tap **Install**.
5. Open Gemini Chat.

Your new Android release APK is ready\!

### Generate APK again after code changes

Whenever you update your application and want a new APK, run:

powershell

```powershell
cd D:\Shahid\2026\my-app\android

.\gradlew assembleRelease
```

The newly generated APK will replace the previous APK at the same output location.

---

## Project structure

text

```text
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
| "Model was not found" | Check the model name in `.env.local` against Google's [models list](<https://ai.google.dev/gemini-api/docs/models>). |
| Input or header sits too high or low | Adjust the `safeArea` values in `src/theme.ts`. |
| NDK missing `source.properties` | Reinstall Android NDK `27.1.12297006` through Android Studio SDK Manager. |
| Gradle build fails | Run `.\gradlew clean` and then `.\gradlew assembleRelease` from the Android directory. |

Check types any time with:

bash

```bash
npx tsc --noEmit
```

## Security note

Variables starting with `EXPO_PUBLIC_` are bundled into the app, so anyone who has the app can extract the key. This setup is fine for learning and personal projects. For a published app, send requests through your own backend and keep the key on the server.

