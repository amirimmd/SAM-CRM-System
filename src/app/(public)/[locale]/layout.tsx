import type { ReactNode } from 'react';

export default function PublicLocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}