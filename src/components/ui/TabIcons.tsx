// Small line icons drawn with plain Views, so the app needs no icon-font
// dependency. Each takes the tint colour the tab bar passes to `tabBarIcon`.
import { View, type ColorValue } from 'react-native';

interface IconProps {
  color: ColorValue;
  /** Filled style for the selected tab. */
  focused?: boolean;
}

/** House: a roof (rotated square) over a body with a door. */
export function HomeIcon({ color, focused }: IconProps) {
  return (
    <View style={{ width: 24, height: 24, alignItems: 'center' }}>
      <View
        style={{
          position: 'absolute',
          top: 3,
          width: 13,
          height: 13,
          borderLeftWidth: 2,
          borderTopWidth: 2,
          borderColor: color,
          borderTopLeftRadius: 2,
          transform: [{ rotate: '45deg' }],
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 2,
          width: 16,
          height: 11,
          borderWidth: 2,
          borderTopWidth: 0,
          borderColor: color,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
          backgroundColor: focused ? color : 'transparent',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            width: 4,
            height: 5,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: focused ? '#FFFFFF' : color,
          }}
        />
      </View>
    </View>
  );
}

/** Three rising bars. */
export function DashboardIcon({ color, focused }: IconProps) {
  const bar = (height: number) => ({
    width: 5,
    height,
    borderRadius: 2,
    backgroundColor: focused ? color : 'transparent',
    borderWidth: 2,
    borderColor: color,
  });
  return (
    <View style={{ width: 24, height: 24, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 2, paddingBottom: 2 }}>
      <View style={bar(9)} />
      <View style={bar(18)} />
      <View style={bar(13)} />
    </View>
  );
}

/** Head and shoulders. */
export function ProfileIcon({ color, focused }: IconProps) {
  return (
    <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 2 }}>
      <View
        style={{
          width: 9,
          height: 9,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: color,
          backgroundColor: focused ? color : 'transparent',
        }}
      />
      <View
        style={{
          width: 17,
          height: 8,
          borderWidth: 2,
          borderBottomWidth: 0,
          borderColor: color,
          borderTopLeftRadius: 9,
          borderTopRightRadius: 9,
          backgroundColor: focused ? color : 'transparent',
        }}
      />
    </View>
  );
}
