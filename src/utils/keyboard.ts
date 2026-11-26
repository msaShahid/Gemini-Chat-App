// Pure helper functions for keyboard avoidance (no React Native imports, so
// they are easy to reason about and test).
//
// Why not just trust the keyboard's reported position? On Android, Expo apps are
// drawn edge-to-edge, so the window is NOT resized when the keyboard opens and
// the position React Native reports ends up being the bottom of the screen. The
// reported keyboard *height* is accurate, so on Android we work from that.

export interface KeyboardTopInput {
  platform: string;
  /** Full screen height in dp (Dimensions 'screen'). */
  screenHeight: number;
  /** Keyboard height from the keyboard event (Android: excludes the nav bar). */
  keyboardHeight: number;
  /** Top of the keyboard from the keyboard event (reliable on iOS). */
  keyboardScreenY: number;
  /** Height of the bottom system bar (Android navigation bar), measured while the keyboard was closed. */
  systemBarBottomInset: number;
}

/** Distance from the top of the screen to the top of the keyboard. */
export function getKeyboardTop(input: KeyboardTopInput): number {
  if (input.platform === 'android') {
    return input.screenHeight - input.keyboardHeight - input.systemBarBottomInset;
  }
  return input.keyboardScreenY;
}

/**
 * How far the layout must be lifted so its bottom edge sits on top of the
 * keyboard. If the system already resized the window (container bottom is
 * already above the keyboard), this is 0, so we never lift twice.
 */
export function getKeyboardInset(containerBottom: number, keyboardTop: number): number {
  return Math.max(0, Math.round(containerBottom - keyboardTop));
}
