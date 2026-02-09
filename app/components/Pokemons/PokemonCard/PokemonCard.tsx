'use client';

import { pokemonTypeColors } from '@/app/lib/constants';
import { getImage } from '@/app/lib/helpers';
import { Link } from '@/i18n/navigation';
import { PokemonStat, PokemonTypeBadges } from '@components';
import { PokemonDetail } from '@types';
import { filter, first, map } from 'lodash-es';
import Image from 'next/image';
import { useMemo } from 'react';

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const primaryTypeName = first(pokemon.types)?.type?.name || 'normal';
  const basicStats = useMemo(
    () => filter(pokemon.stats, stat => ['attack', 'defense'].includes(stat.stat.name)),
    [pokemon.stats],
  );

  return (
    <Link href={`/pokemon/${pokemon.name}`} scroll={false}>
      <div className='relative flex bg-white shadow-xl rounded-lg overflow-hidden'>
        <div className='flex flex-col gap-y-4 p-4 w-1/3'>
          <div className='font-medium text-lg capitalize'>{pokemon.name}</div>
          <div className='flex justify-between'>
            {map(basicStats, stat => (
              <PokemonStat key={stat.stat.name} stat={stat} />
            ))}
          </div>
        </div>
        <div className={`relative p-4 w-2/3 overflow-hidden`}>
          <div className={`absolute inset-0 ${pokemonTypeColors[primaryTypeName]} opacity-50 rounded-r-lg`}></div>
          <div className='relative h-40'>
            <Image src={getImage(pokemon)} alt={pokemon.name} fill className='object-contain' />
          </div>
        </div>
        <div className='bottom-4 left-4 absolute'>
          <PokemonTypeBadges types={pokemon.types} />
        </div>
      </div>
    </Link>
  );
};
