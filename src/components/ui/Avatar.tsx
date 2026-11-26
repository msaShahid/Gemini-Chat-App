import { Text, View } from 'react-native';
import { getInitials } from '../../data/profile';

type AvatarSize = 'sm' | 'md' | 'lg';

const SIZES: Record<AvatarSize, { box: string; text: string }> = {
  sm: { box: 'h-11 w-11 rounded-full', text: 'text-sm' },
  md: { box: 'h-14 w-14 rounded-full', text: 'text-lg' },
  lg: { box: 'h-20 w-20 rounded-full', text: 'text-2xl' },
};

interface AvatarProps {
  name: string;
  size?: AvatarSize;
}

/** Initials avatar, styled like the "G" brand marks used across the app. */
export function Avatar({ name, size = 'md' }: AvatarProps) {
  const style = SIZES[size];
  return (
    <View
      accessibilityLabel={`${name} avatar`}
      className={`items-center justify-center border-2 border-card bg-brand ${style.box}`}
    >
      <Text className={`font-bold text-white ${style.text}`}>{getInitials(name)}</Text>
    </View>
  );
}
