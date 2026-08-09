import type { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

export function Main({ children, className }: MainProps) {
  return (
    <main
      className={`bg-white w-full min-h-screen py-5 px-9 text-black ${className}`}
    >
      {children}
    </main>
  );
}
