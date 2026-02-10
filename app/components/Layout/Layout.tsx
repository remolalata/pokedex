import { Footer, Header } from '@components';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'dark' | 'legendaries';
}

export const Layout = ({ children, variant = 'default' }: LayoutProps) => {
  const layoutClass =
    variant === 'gradient'
      ? 'bg-gradient-to-b from-brand to-brand-foreground'
      : variant === 'dark'
        ? 'bg-brand-dark text-white'
        : variant === 'legendaries'
          ? 'bg-brand-legendaries text-white'
        : 'bg-brand-gray';

  return (
    <div className={`min-h-screen flex flex-col ${layoutClass}`}>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};
