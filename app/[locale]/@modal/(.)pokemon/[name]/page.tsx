import { fetchFamousPokemons, fetchPokemon } from '@/app/lib/api';
import { pokemonTypeHexColors } from '@/app/lib/constants';
import { getGradientFromHex } from '@/app/lib/helpers';
import { Modal, PokemonDetails } from '@components';
import { PokemonDetail } from '@types';
import { first } from 'lodash-es';
import { notFound } from 'next/navigation';

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const famousPokemons = await fetchFamousPokemons();
  return famousPokemons.map(pokemon => ({ name: pokemon.name }));
}

export default async function PokemonModal({ params }: { params: { name: string } }) {
  const { name } = await params;
  let pokemon: PokemonDetail;

  try {
    pokemon = await fetchPokemon(name);
  } catch {
    notFound();
  }

  const primaryType = first(pokemon.types);
  const backgroundColor = pokemonTypeHexColors[primaryType?.type?.name || 'normal'];
  const background = getGradientFromHex(backgroundColor);

  return (
    <Modal
      isOpen={true}
      backgroundColor={backgroundColor}
      background={background}
    >
      <PokemonDetails pokemon={pokemon} />
    </Modal>
  );
}
