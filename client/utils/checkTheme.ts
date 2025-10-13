'use client';

export const checkDefaultTheme = () => {
  if (typeof window !== 'undefined') {
    const isDarkTheme = window?.localStorage?.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
  }
};
