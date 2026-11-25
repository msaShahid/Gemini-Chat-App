import { StyleSheet, Text, View } from 'react-native';
import type { ChatMessage } from '../types/chat';
import { colors, radius, spacing } from '../theme';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowModel]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleModel]}>
        <Text selectable style={[styles.text, isUser ? styles.textUser : styles.textModel]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  rowModel: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.bubble,
  },
  bubbleUser: {
    backgroundColor: colors.accent,
    borderBottomRightRadius: 6,
  },
  bubbleModel: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 6,
  },
  text: {
    fontSize: 16,
    lineHeight: 23,
  },
  textUser: {
    color: colors.onAccent,
  },
  textModel: {
    color: colors.text,
  },
});
