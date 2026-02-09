'use client';

import { usePokemonSearch } from '@/app/hooks';
import { PokemonCard, PokemonCardLoader, Search, SearchError } from '@components';
import { PokemonDetail } from '@types';
import { map } from 'lodash-es';
import { useTranslations } from 'next-intl';

interface PokemonsProps {
  pokemons: PokemonDetail[]
}

export const Pokemons = ({ pokemons: _pokemons }: PokemonsProps) => {
  const t = useTranslations('Pokedex');
  const { pokemons, loading, error, handleSearch } = usePokemonSearch(_pokemons);

  return (
    <div>
      <h1 className='text-2xl md:text-4xl font-medium text-center'>
        {t.rich('heading', {
          strong: chunks => <span className='font-bold'>{chunks}</span>,
        })}
      </h1>

      <Search onSearch={handleSearch} />

      {loading && <PokemonCardLoader />}
      {error && <SearchError message={error} />}

      {!loading && !error && pokemons.length === 0 && (
        <p className='text-center text-gray-600 mt-8'>{t('empty')}</p>
      )}

      {!loading && !error && pokemons.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6 md:gap-y-6 lg:gap-x-8 lg:gap-y-8'>
          {map(pokemons, pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};
