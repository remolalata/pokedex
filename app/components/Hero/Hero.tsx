import Image from 'next/image';
import { PokemonTypeButton } from '@components';
import { SEE_POKEMONS } from '@config';

export const Hero = () => {
  return (
    <div className='p-5'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-x-10'>
          <div className='relative h-72 md:h-96 lg:h-[500px] lg:w-1/2'>
            <Image src={'/images/hero.png'} alt='Hero' fill className='object-contain' />
          </div>
          <div className='text-center lg:text-left font-medium space-y-3 lg:w-1/2'>
            <h1 className='text-5xl md:text-7xl leading-tight'>
              <span className='font-semibold'>Find</span> all your favorite <span className='font-semibold'>Pokémon</span>
            </h1>
            <p className='text-2xl lg:text-4xl lg:leading-tight'>You can know the type of Pokemon, its strengths, disadvantages and abilities</p>
            <PokemonTypeButton variant='grass' size='large' className='w-full md:w-auto mt-10 md:px-8'>
              {SEE_POKEMONS}
            </PokemonTypeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
