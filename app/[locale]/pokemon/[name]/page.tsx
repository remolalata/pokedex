import { fetchFamousPokemons, fetchPokemon } from '@/app/lib/api';
import { pokemonTypeHexColors } from '@/app/lib/constants';
import { Layout, PokemonDetails } from '@components';
import { PokemonDetail } from '@types';
import { first } from 'lodash-es';
import { notFound } from 'next/navigation';

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const famousPokemons = await fetchFamousPokemons();
  return famousPokemons.map(pokemon => ({ name: pokemon.name }));
}

export default async function PokemonPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  let pokemon: PokemonDetail;

  try {
    pokemon = await fetchPokemon(name);
  } catch {
    notFound();
  }

  const primaryType = first(pokemon.types);
  const backgroundColor = pokemonTypeHexColors[primaryType?.type?.name || 'normal'];

  return (
    <Layout>
      <div className='p-5'>
        <div
          className='container mx-auto lg:max-w-[540px] rounded-2xl py-4 shadow-xl'
          style={{ backgroundColor }}
        >
          <PokemonDetails pokemon={pokemon} />
        </div>
      </div>
    </Layout>
  );
}
