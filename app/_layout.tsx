import '../global.css';

import { Stack } from 'expo-router';
import { ChatProvider } from '../src/context/ChatContext';
import { colors } from '../src/constants/colors';

// Deep links straight to /chat still get the tabs underneath, so "back" works.
export const unstable_settings = {
  anchor: '(tabs)',
};

/**
 * Root navigator. Expo Router already wraps the app in a SafeAreaProvider.
 * ChatProvider sits above every screen so one conversation is shared by
 * Home, Dashboard, Profile and the chat itself.
 */
export default function RootLayout() {
  return (
    <ChatProvider>
      <Stack
        screenOptions={{
          headerShown: false, // every screen draws its own safe-area-aware header
          contentStyle: { backgroundColor: colors.paper },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat" />
      </Stack>
    </ChatProvider>
  );
}
