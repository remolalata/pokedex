import { Layout, PokemonCardLoader } from '@components';

export default function PokedexLoading() {
  return (
    <Layout>
      <div className='p-5'>
        <div className='container mx-auto lg:max-w-[800px]'>
          <PokemonCardLoader />
        </div>
      </div>
    </Layout>
  );
}
