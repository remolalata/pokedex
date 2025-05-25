import { PokemonStat as PokemonStatType } from '@types';

interface PokemonStatProps {
  stat: PokemonStatType;
}

export const PokemonStat = ({ stat }: PokemonStatProps) => {
  return (
    <div className='flex flex-col items-center gap-y-2 text-xs'>
      <div className='border-2 rounded-full h-8 w-8 flex items-center justify-center'>
        {stat?.base_stat || 0}
      </div>
      <div className='capitalize'>{stat?.stat?.name || ''}</div>
    </div>
  );
};
