import Image from 'next/image';
import { NOT_FOUND_SUBTITLE, NOT_FOUND_TITLE, RETURN } from './lib/config';
import { PokemonTypeButton } from './components';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='bg-error min-h-screen flex flex-col gap-y-5 items-center justify-center p-5 font-bold text-white text-2xl'>
      <div className='relative w-full h-64'>
        <Image
          src={'images/not-found/hero.svg'}
          alt='Not Found'
          fill
          className='object-contain'
          priority
        />
      </div>
      <div className='text-center'>
        <div>{NOT_FOUND_TITLE}</div>
        <div className='text-black'>{NOT_FOUND_SUBTITLE}</div>
      </div>
      <div>
        <PokemonTypeButton variant='electric' size='medium' className='mt-10'>
          <Link href={'/'} className='font-bold'>
            {RETURN}
          </Link>
        </PokemonTypeButton>
      </div>
    </div>
  );
}
