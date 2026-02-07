import { PokemonTypeButton } from '@components';
import { PokemonType, PokemonTypeSlot } from '@types';
import { map, take } from 'lodash-es';

interface PokemonTypeBadgesProps {
  types: PokemonTypeSlot[];
}

export const PokemonTypeBadges = ({ types }: PokemonTypeBadgesProps) => {
  const visibleTypes = take(types, 2);

  return (
    <div className='flex gap-x-3'>
      {map(visibleTypes, typeData => (
        <PokemonTypeButton
          key={typeData.type.name}
          variant={typeData.type.name as PokemonType}
          rounded
          className='px-0.5 !py-1 capitalize'
        >
          {typeData.type.name}
        </PokemonTypeButton>
      ))}
    </div>
  );
};
