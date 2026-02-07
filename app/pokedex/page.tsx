import { fetchFamousPokemons } from '@api';
import { Layout, Pokemons } from '@components';

export const revalidate = 3600;

export default async function PokedexPage() {
  const famousPokemons = await fetchFamousPokemons();
  
  return (
    <Layout>
      <div className='p-5'>
        <div className='container mx-auto lg:max-w-[800px]'>
          <Pokemons pokemons={famousPokemons} />
        </div>
      </div>
    </Layout>
  );
}
