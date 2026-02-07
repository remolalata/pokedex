import { PokemonDetail } from '@types';

export const getImage = (pokemon: PokemonDetail): string => {
  const fallbackImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

  if (!pokemon) return fallbackImage;

  return (
    pokemon?.sprites?.other?.dream_world?.front_default ??
    pokemon?.sprites?.front_default ??
    fallbackImage
  );
};
