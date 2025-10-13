import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToastProvider from '../components/ToastProvider';
import { ReactQueryClientProvider } from '../context/ReactQueryClientProvider';
import './globals.css';
import StyledComponentsRegistry from './registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mern Next Jobify',
  description: 'Job application tracking system for job hunters',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <ToastProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ToastProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
