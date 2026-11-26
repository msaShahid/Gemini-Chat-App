// Placeholder user profile. The app has no sign-in yet, so this is the single
// place to change the name and details shown on the Home and Profile screens.
// Replace it with data from your auth provider when you add one.

export interface UserProfile {
  name: string;
  email: string;
  plan: string;
  memberSince: string;
  location: string;
}

export const USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  plan: 'Free plan',
  memberSince: 'March 2026',
  location: 'Bengaluru, India',
};

/** "Alex Morgan" -> "AM" */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** "Alex Morgan" -> "Alex" */
export function getFirstName(name: string): string {
  return name.split(/\s+/)[0] ?? name;
}
