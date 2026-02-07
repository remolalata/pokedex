import { Logo, Navigation } from '@components';

export const Header = () => {
  return (
    <header className='z-10 relative bg-brand shadow-lg p-5'>
      <div className='flex justify-between items-center mx-auto container'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};
