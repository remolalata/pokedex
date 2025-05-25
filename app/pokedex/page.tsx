import { fetchPokemonList, fetchPokemonListsDetails } from '@api';
import { parsePokemonListsToId } from '@helpers';
import { Pokemons } from '@components';

export default async function PokedexPage() {
  const { results: pokemonLists = [] } = await fetchPokemonList();

  const pokemonWithId = parsePokemonListsToId(pokemonLists);

  const pokemonListWithDetails = await fetchPokemonListsDetails(pokemonWithId);

  return (
    <Pokemons pokemons={pokemonListWithDetails} />
    )
}
