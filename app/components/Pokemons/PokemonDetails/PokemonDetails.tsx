import { getBattlePower, getImage } from '@/app/lib/helpers';
import { PokemonDetail } from '@/app/lib/types';
import { map } from 'lodash-es';
import Image from 'next/image';
import { PokemonTypeBadges } from '../PokemonTypeBadges';

interface PokemonDetailsProps {
  pokemon: PokemonDetail;
}

export const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <div className='flex flex-col px-4 text-gray-950'>
      <div className='flex flex-col gap-y-2 w-full'>
        <h1 className='font-bold text-white text-4xl text-center capitalize'>{pokemon.name}</h1>
        <div className='relative h-40'>
          <Image src={getImage(pokemon)} alt={pokemon.name} fill className='object-contain' />
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center bg-yellow-500 rounded-full w-10 h-10 font-medium'>
              {getBattlePower(pokemon.stats)}
            </div>
            <div className='font-medium'>Battle Power</div>
          </div>
          <PokemonTypeBadges types={pokemon.types} />
        </div>
      </div>
      <div>
        <div className='bg-white shadow-2xl p-4 rounded-2xl'>
          <h2 className='font-medium text-xl'>Abilities</h2>
          <ul className='flex gap-2 text-sm'>
            {map(pokemon.abilities, ability => (
              <li key={ability.ability.name} className='capitalize'>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
