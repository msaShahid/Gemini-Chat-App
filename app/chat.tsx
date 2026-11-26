import { useRouter } from 'expo-router';
import { ChatScreen } from '../src/screens/ChatScreen';

/** /chat — the existing Gemini chat, pushed on top of the tabs. */
export default function ChatRoute() {
  const router = useRouter();

  // If the app was opened directly on /chat there may be nothing to go back to.
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return <ChatScreen onBack={goBack} />;
}
