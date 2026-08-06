import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="bg-white w-full min-h-screen p-9 text-black">
      {children}
    </main>
  );
}
