import { Logo, Navigation } from '@components';

export const Header = () => {
  return (
    <header className='bg-brand shadow-lg p-5'>
      <div className='container mx-auto flex items-center justify-between'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};
