import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio-A | Affiliate AI Generator',
  description: 'Generate product copy, storyboard scenes, optimized prompts, and export-ready affiliate assets.'
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
