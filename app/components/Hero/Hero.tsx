import { PokemonTypeButton } from '@components';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <div className='p-5'>
      <div className='mx-auto container'>
        <div className='flex lg:flex-row-reverse flex-col lg:justify-between lg:items-center lg:gap-x-10'>
          <div className='relative lg:w-1/2 h-72 md:h-96 lg:h-[500px]'>
            <Image src={'/images/hero.png'} alt='Hero' fill className='object-contain' />
          </div>
          <div className='space-y-3 lg:w-1/2 font-medium lg:text-left text-center'>
            <h1 className='text-5xl md:text-7xl leading-tight'>
              {t.rich('title', {
                strong: chunks => <span className='font-semibold'>{chunks}</span>,
              })}
            </h1>
            <p className='text-2xl lg:text-4xl lg:leading-tight'>{t('subtitle')}</p>
            <Link href='/pokedex'>
              <PokemonTypeButton
                variant='grass'
                size='large'
                className='mt-10 md:px-8 w-full md:w-auto'
              >
                {t('seePokemons')}
              </PokemonTypeButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
