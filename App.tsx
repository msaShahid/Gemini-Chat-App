// Legacy single-screen entry point.
//
// The app now starts from Expo Router ("main": "expo-router/entry" in
// package.json), and the routes live in app/. This file is kept so the old
// index.ts entry still works if you switch "main" back; it renders the same
// chat screen that the /chat route uses.
import './global.css';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChatProvider } from './src/context/ChatContext';
import { ChatScreen } from './src/screens/ChatScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatProvider>
        <ChatScreen />
      </ChatProvider>
    </SafeAreaProvider>
  );
}
