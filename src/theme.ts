import { Dimensions, Platform, StatusBar } from 'react-native';

export const colors = {
  background: '#FFFFFF',
  surface: '#F2F3F5',
  border: '#E4E6EA',
  text: '#16181D',
  textMuted: '#6B7280',
  accent: '#0F766E',
  accentDisabled: '#B7D5D1',
  onAccent: '#FFFFFF',
  errorBackground: '#FDECEC',
  errorBorder: '#F5C2C2',
  errorText: '#9B1C1C',
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

export const radius = { bubble: 20, input: 24, pill: 999 };

// Safe-area padding without extra libraries.
// Expo draws the app edge-to-edge, so we pad for the status bar / notch at the
// top and the home indicator / navigation bar at the bottom. These are close
// approximations; adjust the numbers here if your device needs it.
const hasHomeIndicator =
  Platform.OS === 'ios' && !Platform.isPad && Dimensions.get('window').height >= 812;

export const safeArea = {
  top:
    Platform.OS === 'android'
      ? (StatusBar.currentHeight ?? 24)
      : Platform.OS === 'ios'
        ? hasHomeIndicator
          ? 54
          : Platform.isPad
            ? 24
            : 20
        : 0,
  bottom: Platform.OS === 'android' ? 40 : hasHomeIndicator ? 24 : 8,
};
