export const POKE_API = 'https://pokeapi.co/api/v2';

export const endpoints = {
  listPokemons: (limit = 20, offset = 0) => `${POKE_API}/pokemon?limit=${limit}&offset=${offset}`,
  getPokemon: (nameOrId: string | number) => `${POKE_API}/pokemon/${nameOrId}`,
};
