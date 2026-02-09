import { PokemonStat as PokemonStatType } from '@types';

interface PokemonStatProps {
  stat: PokemonStatType;
  label?: string;
}

export const PokemonStat = ({ stat, label }: PokemonStatProps) => {
  return (
    <div className='flex flex-col items-center gap-y-1 text-[10px] md:text-[12px]'>
      <div className='border-2 rounded-full h-7 w-7 md:h-8 md:w-8 flex items-center justify-center text-[10px] md:text-[12px]'>
        {stat?.base_stat || 0}
      </div>
      <div className='capitalize'>{label || stat?.stat?.name || ''}</div>
    </div>
  );
};
