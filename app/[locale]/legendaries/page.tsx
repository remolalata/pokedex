import { LegendariesContent } from '@/app/components/Legendaries/LegendariesContent';
import { fetchLegendaryPokemons } from '@api';
import { Layout } from '@components';
import { getTranslations } from 'next-intl/server';

export const revalidate = 3600;

interface PokemonSpeciesResponse {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

const getPokemonDescription = async (
  speciesUrl: string,
  fallbackDescription: string,
): Promise<string> => {
  const response = await fetch(speciesUrl);

  if (!response.ok) return fallbackDescription;

  const data: PokemonSpeciesResponse = await response.json();
  const englishEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');

  if (!englishEntry) return fallbackDescription;

  return englishEntry.flavor_text.replace(/\s+/g, ' ').trim();
};

export default async function LegendariesPage() {
  const t = await getTranslations('Legendaries');
  const legendaryPokemons = await fetchLegendaryPokemons();
  const descriptionEntries = await Promise.all(
    legendaryPokemons.map(async pokemon => [
      String(pokemon.id),
      await getPokemonDescription(pokemon.species.url, t('descriptionUnavailable')),
    ]),
  );
  const descriptionsById = Object.fromEntries(descriptionEntries);

  return (
    <Layout variant='legendaries'>
      <div className='p-5'>
        <div className='mx-auto lg:max-w-[800px] container'>
          {legendaryPokemons.length > 0 ? (
            <LegendariesContent
              pokemons={legendaryPokemons}
              descriptionsById={descriptionsById}
              labels={{
                healthPoints: t('metrics.healthPoints'),
                experience: t('metrics.experience'),
                attack: t('metrics.attack'),
                defense: t('metrics.defense'),
                specialAttack: t('metrics.specialAttack'),
                specialDefense: t('metrics.specialDefense'),
                loadFailed: t('loadFailed'),
                descriptionUnavailable: t('descriptionUnavailable'),
              }}
            />
          ) : (
            <p className='mt-8 text-gray-600'>{t('loadFailed')}</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
