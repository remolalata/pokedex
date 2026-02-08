import { fetchFamousPokemons } from '@api';
import { Layout, Pokemons } from '@components';

export const revalidate = 3600;

export default async function PokedexPage() {
  const famousPokemons = await fetchFamousPokemons();
  
  return (
    <Layout>
      <div className='p-5'>
        <div className='container mx-auto lg:max-w-[800px]'>
          {famousPokemons.length > 0 ? (
            <Pokemons pokemons={famousPokemons} />
          ) : (
            <p className='text-center text-gray-600 mt-8'>
              We could not load Pokémon right now. Please try again.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
