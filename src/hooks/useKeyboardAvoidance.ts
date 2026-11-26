import { useCallback, useEffect, useRef, useState, type ComponentRef } from 'react';
import {
  Dimensions,
  Keyboard,
  LayoutAnimation,
  Platform,
  type KeyboardEvent as RNKeyboardEvent,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getKeyboardInset, getKeyboardTop } from '../utils/keyboard';

/**
 * Keeps the whole screen above the keyboard.
 *
 * Attach `containerRef` and `onContainerLayout` to the root View of the screen,
 * and give that same View `paddingBottom: keyboardInset`. The padding shrinks
 * the message list and lifts the input bar so it sits right above the keyboard.
 *
 * It measures where the root View actually ends and where the keyboard starts,
 * so it also does the right thing if the system already resized the window.
 */
export function useKeyboardAvoidance() {
  const insets = useSafeAreaInsets();
  const containerRef = useRef<ComponentRef<typeof View>>(null);
  const [keyboardInset, setKeyboardInset] = useState(0);

  // Top of the keyboard (distance from screen top), or null while it is closed.
  const keyboardTopRef = useRef<number | null>(null);
  // Bottom system bar height, remembered while the keyboard is closed.
  const systemBarInsetRef = useRef(insets.bottom);

  useEffect(() => {
    if (keyboardTopRef.current === null) {
      systemBarInsetRef.current = insets.bottom;
    }
  }, [insets.bottom]);

  const updateInset = useCallback((duration?: number, easing?: RNKeyboardEvent['easing']) => {
    const keyboardTop = keyboardTopRef.current;

    const apply = (value: number) => {
      setKeyboardInset((previous) => {
        if (previous === value) return previous;
        // iOS tells us how long the keyboard animation takes; follow it.
        if (Platform.OS === 'ios' && duration && easing) {
          LayoutAnimation.configureNext({
            duration: Math.max(duration, 10),
            update: { duration: Math.max(duration, 10), type: LayoutAnimation.Types[easing] },
          });
        }
        return value;
      });
    };

    if (keyboardTop === null) {
      apply(0);
      return;
    }

    containerRef.current?.measureInWindow((_x, y, _width, height) => {
      if (height === 0) return; // not laid out yet
      apply(getKeyboardInset(y + height, keyboardTop));
    });
  }, []);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (event) => {
      keyboardTopRef.current = getKeyboardTop({
        platform: Platform.OS,
        screenHeight: Dimensions.get('screen').height,
        keyboardHeight: event.endCoordinates.height,
        keyboardScreenY: event.endCoordinates.screenY,
        systemBarBottomInset: systemBarInsetRef.current,
      });
      updateInset(event.duration, event.easing);
    });

    const hideSub = Keyboard.addListener(hideEvent, (event) => {
      keyboardTopRef.current = null;
      updateInset(event.duration, event.easing);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [updateInset]);

  // If the screen size changes while the keyboard is open (rotation, window
  // resize), measure again.
  const onContainerLayout = useCallback(() => {
    if (keyboardTopRef.current !== null) updateInset();
  }, [updateInset]);

  return { containerRef, onContainerLayout, keyboardInset };
}
