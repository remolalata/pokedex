import { PokemonTypeButton } from '@components';
import { SEE_POKEMONS } from '@config';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className='p-5'>
      <div className='mx-auto container'>
        <div className='flex lg:flex-row-reverse flex-col lg:justify-between lg:items-center lg:gap-x-10'>
          <div className='relative lg:w-1/2 h-72 md:h-96 lg:h-[500px]'>
            <Image src={'/images/hero.png'} alt='Hero' fill className='object-contain' />
          </div>
          <div className='space-y-3 lg:w-1/2 font-medium lg:text-left text-center'>
            <h1 className='text-5xl md:text-7xl leading-tight'>
              <span className='font-semibold'>Find</span> all your favorite{' '}
              <span className='font-semibold'>Pokémon</span>
            </h1>
            <p className='text-2xl lg:text-4xl lg:leading-tight'>
              You can know the type of Pokemon, its strengths, disadvantages and abilities
            </p>
            <Link href='/pokedex'>
              <PokemonTypeButton
                variant='grass'
                size='large'
                className='mt-10 md:px-8 w-full md:w-auto'
              >
                {SEE_POKEMONS}
              </PokemonTypeButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
