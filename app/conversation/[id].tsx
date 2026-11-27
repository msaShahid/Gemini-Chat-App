import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { MessageBubble } from '../../src/components/MessageBubble';
import { Badge, Button, Card, Screen, SectionHeader } from '../../src/components/ui';
import { useChatSession } from '../../src/context/ChatContext';
import { getConversationById } from '../../src/data/dashboard';

/**
 * /conversation/[id] — dynamic route.
 * The file name's [id] segment becomes a URL parameter, so /conversation/2
 * renders this screen with id = "2". Opened from Dashboard › Recent conversations.
 */
export default function ConversationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sendMessage, isLoading } = useChatSession();
  const conversation = getConversationById(id);

  // Opened directly via a link there may be nothing to go back to.
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/dashboard'));

  if (!conversation) {
    return (
      <Screen
        onBack={goBack}
        eyebrow="Conversation"
        title="Not found"
        subtitle={`There's no conversation with the id “${id ?? ''}”.`}
      >
        <Button label="Back to dashboard" trailing="→" onPress={() => router.replace('/dashboard')} />
      </Screen>
    );
  }

  const continueInChat = () => {
    sendMessage(conversation.prompt);
    router.push('/chat');
  };

  return (
    <Screen onBack={goBack} eyebrow={conversation.topicLabel} title={conversation.title} subtitle={conversation.summary}>
      {/* Details */}
      <Card>
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft">
            <Text className="text-lg font-bold text-brand">{conversation.topic}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-ink">{conversation.detail}</Text>
            <Text className="mt-0.5 text-sm text-muted">Last active {conversation.time}</Text>
          </View>
          <Badge label="Sample" />
        </View>

        <View className="mt-4 flex-row rounded-2xl bg-paper px-4 py-3">
          <Text className="text-xs text-muted">Route </Text>
          <Text selectable className="text-xs font-semibold text-ink">
            /conversation/{conversation.id}
          </Text>
        </View>
      </Card>

      {/* Excerpt, rendered with the chat's own message bubbles */}
      <View>
        <SectionHeader title="Excerpt" />
        <Card className="pb-1">
          {conversation.preview.map((message, index) => (
            <MessageBubble key={index} message={{ id: `${conversation.id}-${index}`, ...message }} />
          ))}
        </Card>
      </View>

      <View className="gap-3">
        <Button
          label="Ask Gemini again"
          trailing="→"
          onPress={continueInChat}
          accessibilityLabel={`Ask Gemini again: ${conversation.prompt}`}
          fullWidth
        />
        <Text className="text-center text-xs text-muted">
          {isLoading ? 'Gemini is still replying to your last message…' : `Sends “${conversation.prompt}” to the chat.`}
        </Text>
      </View>
    </Screen>
  );
}
