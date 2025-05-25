import { ReactNode } from 'react';
import { Footer } from '@components';

interface LayoutProps {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'dark';
}

export const Layout = ({ children, variant = 'default' }: LayoutProps) => {
  const layoutClass =
    variant === 'gradient'
      ? 'bg-gradient-to-b from-brand to-brand-foreground'
      : variant === 'dark'
        ? 'bg-brand-dark text-white'
        : 'bg-brand-gray';

  return (
    <div className={`min-h-screen flex flex-col ${layoutClass}`}>
      <div className='flex-grow flex flex-col justify-between'>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};
