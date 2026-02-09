import { pokemonTypeColors } from '@/app/lib/constants';
import { getBattlePower, getImage, getPokemonMetrics } from '@/app/lib/helpers';
import { PokemonDetail } from '@/app/lib/types';
import { filter, map } from 'lodash-es';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo } from 'react';
import { PokemonMetric } from '../PokemonMetric';
import { PokemonStat } from '../PokemonStat';
import { PokemonTypeBadges } from '../PokemonTypeBadges';

interface PokemonDetailsProps {
  pokemon: PokemonDetail;
}

export const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  const t = useTranslations('PokemonDetails');
  const { hp, experience, hpMax, experienceMax } = getPokemonMetrics(pokemon);

  const hpColorClass = pokemonTypeColors.grass.split(' ')[0];
  const experienceColorClass = pokemonTypeColors.electric.split(' ')[0];
  const basicStats = useMemo(
    () =>
      filter(pokemon.stats, stat =>
        ['attack', 'defense', 'special-attack', 'special-defense'].includes(stat.stat.name),
      ),
    [pokemon.stats],
  );

  const formatStatLabel = (name: string) => {
    if (name === 'special-attack') return 'SP Attack';
    if (name === 'special-defense') return 'SP Defense';

    return name;
  };

  return (
    <div className='px-4 text-gray-950'>
      <h1 className='mb-2.5 font-bold text-white text-4xl text-center capitalize md:hidden'>{pokemon.name}</h1>
      <div className='flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6'>
        <div className='md:w-2/5 md:grid md:grid-rows-[1fr_auto]'>
          <div className='flex items-center'>
            <div className='relative h-40 w-full md:h-64'>
              <div className='absolute left-1/2 -bottom-[20px] -translate-x-1/2 w-52 h-10 md:w-64 md:h-12 rounded-full bg-black/35 blur-lg'></div>
              <Image src={getImage(pokemon)} alt={pokemon.name} fill className='object-contain' />
            </div>
          </div>
          <div className='mt-4 hidden md:flex md:mt-auto md:mb-4 md:justify-end'>
            <PokemonTypeBadges types={pokemon.types} />
          </div>
        </div>

        <div className='flex flex-col gap-y-4 md:w-3/5'>
          <div className='flex items-center justify-between md:hidden'>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-yellow-500 rounded-full w-10 h-10 font-medium'>
                {getBattlePower(pokemon.stats)}
              </div>
              <div className='font-medium'>{t('battlePower')}</div>
            </div>
            <PokemonTypeBadges types={pokemon.types} />
          </div>

          <div className='hidden md:flex md:flex-row md:items-center md:justify-between'>
            <h1 className='font-bold text-white text-2xl text-left capitalize'>
              {pokemon.name}
            </h1>
            <div className='flex items-center gap-2'>
              <div className='flex justify-center items-center bg-yellow-500 rounded-full w-10 h-10 font-medium'>
                {getBattlePower(pokemon.stats)}
              </div>
              <div className='font-medium'>{t('battlePower')}</div>
            </div>
          </div>

          <div className='bg-white shadow-2xl p-4 rounded-2xl'>
            <h2 className='font-medium text-xl'>{t('abilities')}</h2>
            <ul className='flex gap-2 text-sm'>
              {map(pokemon.abilities, ability => (
                <li key={ability.ability.name} className='capitalize'>
                  {ability.ability.name}
                </li>
              ))}
            </ul>
          </div>

          <div className='space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 bg-white shadow-2xl p-4 rounded-2xl'>
            <PokemonMetric
              label={t('healthPoints')}
              value={hp}
              maxValue={hpMax}
              barColorClass={hpColorClass}
            />
            <PokemonMetric
              label={t('experience')}
              value={experience}
              maxValue={experienceMax}
              barColorClass={experienceColorClass}
            />
          </div>

          <div className='grid grid-cols-4 gap-3 mb-4'>
            {map(basicStats, stat => (
              <div key={stat.stat.name} className='bg-white shadow-md border border-gray-200 p-3 rounded-xl'>
                <PokemonStat stat={stat} label={formatStatLabel(stat.stat.name)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
