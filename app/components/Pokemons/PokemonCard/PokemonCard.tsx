'use client';

import { pokemonTypeColors } from '@/app/lib/constants';
import { getImage } from '@/app/lib/helpers';
import { PokemonStat, PokemonTypeButton } from '@components';
import { PokemonDetail, PokemonType } from '@types';
import { filter, first, map, take } from 'lodash-es';
import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  pokemon: PokemonDetail;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const primaryType = first(pokemon?.types);
  const basicStats = filter(pokemon?.stats, s => ['attack', 'defense'].includes(s.stat.name));
  const types = take(pokemon?.types, 2);

  return (
    <Link href={`pokemon/${pokemon?.name}`}>
      <div className='relative flex shadow-xl rounded-lg bg-white overflow-hidden'>
        <div className='w-1/3 p-4 flex flex-col gap-y-4'>
          <div className='font-medium capitalize text-lg'>{pokemon?.name || ''}</div>
          <div className='flex justify-between'>
            {map(basicStats, (stat, index) => (
              <PokemonStat key={index} stat={stat} />
            ))}
          </div>
        </div>
        <div className={`relative p-4 w-2/3 overflow-hidden`}>
          <div
            className={`absolute inset-0 ${pokemonTypeColors[primaryType?.type?.name || 'normal']} opacity-50 rounded-r-lg`}
          ></div>
          <div className='relative h-40'>
            <Image
              src={getImage(pokemon)}
              alt={pokemon.name}
              fill
              className='object-contain'
            />
          </div>
        </div>
        <div className='absolute bottom-4 left-4'>
          <div className='flex gap-x-3'>
            {map(types, (type, index) => (
              <PokemonTypeButton
                key={index}
                variant={type?.type?.name as PokemonType}
                rounded
                className='px-0.5 !py-1 capitalize'
              >
                {type?.type?.name || ''}
              </PokemonTypeButton>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
