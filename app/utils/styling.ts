export const toggleColorScheme = (setColorScheme:(scheme: 'light' | 'dark')=>void, currentScheme: 'light' | 'dark' | 'auto') => {
  setColorScheme(currentScheme === 'dark' ? 'light' : 'dark');
};