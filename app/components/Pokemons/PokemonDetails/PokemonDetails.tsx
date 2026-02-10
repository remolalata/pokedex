'use client';

import { pokemonTypeColors } from '@/app/lib/constants';
import { useIsMobile } from '@/app/hooks';
import { getBattlePower, getImage, getPokemonMetrics } from '@/app/lib/helpers';
import { PokemonDetail } from '@/app/lib/types';
import { filter, map } from 'lodash-es';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { PokemonMetric } from '../PokemonMetric';
import { PokemonStat } from '../PokemonStat';
import { PokemonTypeBadges } from '../PokemonTypeBadges';

interface PokemonDetailsProps {
  pokemon: PokemonDetail;
}

export const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  const t = useTranslations('PokemonDetails');
  const isMobile = useIsMobile();
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  const [hoveredAbility, setHoveredAbility] = useState<string | null>(null);
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

  const formatAbilityLabel = (name: string) => name.replaceAll('-', ' ');

  useEffect(() => {
    if (!selectedAbility) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const abilityRoot = target?.closest<HTMLElement>('[data-ability-root]');

      if (!abilityRoot || abilityRoot.dataset.abilityRoot !== selectedAbility) {
        setSelectedAbility(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedAbility]);

  return (
    <div className='px-4 text-gray-950'>
      <h1 className='mb-2.5 font-bold text-white text-4xl text-center capitalize md:hidden'>{pokemon.name}</h1>
      <div className='flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6'>
        <div className='md:w-2/5 md:grid md:grid-rows-[1fr_auto]'>
          <div className='flex items-center'>
            <div className='relative h-52 w-full md:h-64'>
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
            <div className='flex items-center justify-between'>
              <h2 className='font-medium text-xl'>{t('abilities')}</h2>
              <span className='text-gray-500 text-sm'>{pokemon.abilities.length}</span>
            </div>
            <ul className='mt-3 flex flex-wrap gap-2'>
              {map(pokemon.abilities, ability => (
                <li
                  key={ability.ability.name}
                  data-ability-root={ability.ability.name}
                  className='relative rounded-full border border-slate-200 bg-slate-50 px-3 py-2'
                  onMouseEnter={() => {
                    if (!isMobile && ability.description) {
                      setHoveredAbility(ability.ability.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredAbility(null);
                    }
                  }}
                >
                  <button
                    type='button'
                    className='cursor-pointer text-left'
                    onClick={() => {
                      if (!ability.description) return;
                      setSelectedAbility(current =>
                        current === ability.ability.name ? null : ability.ability.name,
                      );
                    }}
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-slate-900 text-sm font-semibold capitalize'>
                        {formatAbilityLabel(ability.ability.name)}
                      </span>
                      {ability.is_hidden && (
                        <span className='rounded-full bg-slate-200 px-2 py-0.5 text-[11px] text-slate-700 uppercase tracking-wide'>
                          Hidden
                        </span>
                      )}
                    </div>
                  </button>
                  {ability.description &&
                    (selectedAbility === ability.ability.name ||
                      hoveredAbility === ability.ability.name) && (
                      <div className='top-full z-20 absolute left-0 mt-2 w-72 max-w-[calc(100vw-3rem)] rounded-lg border border-slate-200 bg-white p-3 text-slate-600 text-sm leading-snug shadow-lg'>
                        {ability.description}
                      </div>
                    )}
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
