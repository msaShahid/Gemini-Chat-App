import { Pressable, Text } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'inverse';

const VARIANTS: Record<ButtonVariant, { box: string; text: string }> = {
  // Brand-blue button on light surfaces.
  primary: { box: 'bg-brand active:bg-brand-dark', text: 'text-white' },
  // Outlined button on light surfaces.
  secondary: { box: 'border border-line bg-card active:bg-brand-soft', text: 'text-ink' },
  // White button for use on brand-blue surfaces.
  inverse: { box: 'bg-card active:opacity-80', text: 'text-brand' },
};

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  /** Optional trailing glyph, e.g. "→". */
  trailing?: string;
  accessibilityLabel?: string;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  trailing,
  accessibilityLabel,
  fullWidth = false,
}: ButtonProps) {
  const style = VARIANTS[variant];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      className={`flex-row items-center justify-center gap-2 rounded-full px-5 py-3 ${style.box} ${
        fullWidth ? 'w-full' : 'self-start'
      }`}
    >
      <Text className={`text-base font-semibold ${style.text}`}>{label}</Text>
      {trailing ? <Text className={`text-base font-semibold ${style.text}`}>{trailing}</Text> : null}
    </Pressable>
  );
}
