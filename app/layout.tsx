import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate AI Generator',
  description: 'Generate storyboard, script, and prompts for affiliate ads.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
