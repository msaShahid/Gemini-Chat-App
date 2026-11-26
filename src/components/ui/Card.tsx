import type { ReactNode } from 'react';
import { View } from 'react-native';

interface CardProps {
  children: ReactNode;
  /** Extra classes, e.g. padding overrides or "flex-1". */
  className?: string;
}

/** Raised white surface with the app's standard border and corner radius. */
export function Card({ children, className = '' }: CardProps) {
  return <View className={`rounded-3xl border border-line bg-card p-5 ${className}`}>{children}</View>;
}
