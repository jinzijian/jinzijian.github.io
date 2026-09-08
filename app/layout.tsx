import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://jinzijian.github.io'),
  alternates: { canonical: 'https://jinzijian.github.io/' },
  title: 'Zijian Jin — AI Research & Engineering',
  description: 'Zijian Jin (Alex), Senior Research Engineer at Meta. Coding agents, reinforcement learning, and adaptive world models. Previously Microsoft and TikTok.',
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
