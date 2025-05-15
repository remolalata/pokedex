import Image from 'next/image';

export const Logo = () => {
  return (
    <div className='relative'>
      <Image src={'/images/logo.svg'} alt='Pokedex' className='block md:hidden' width={59} height={22} />
      <Image src={'/images/logo.svg'} alt='Pokedex' className='hidden md:block lg:hidden' width={121} height={45} />
      <Image src={'/images/logo.svg'} alt='Pokedex' className='hidden lg:block' width={151} height={63} />
    </div>
  );
};
