import { pokemonTypeColors } from '@/app/lib/constants';
import { LegendarySlider } from '@/app/components/Legendaries/LegendarySlider';
import { getImage, getPokemonMetric } from '@/app/lib/helpers';
import { fetchLegendaryPokemons } from '@api';
import { Layout, PokemonMetric } from '@components';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

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
  const firstLegendary = legendaryPokemons[0];
  const firstLegendaryDescription = firstLegendary
    ? await getPokemonDescription(firstLegendary.species.url, t('descriptionUnavailable'))
    : null;
  const metrics = firstLegendary
    ? [
        { label: t('metrics.healthPoints'), ...getPokemonMetric(firstLegendary, 'hp') },
        { label: t('metrics.experience'), ...getPokemonMetric(firstLegendary, 'experience') },
        { label: t('metrics.attack'), ...getPokemonMetric(firstLegendary, 'attack') },
        { label: t('metrics.defense'), ...getPokemonMetric(firstLegendary, 'defense') },
        {
          label: t('metrics.specialAttack'),
          ...getPokemonMetric(firstLegendary, 'special-attack'),
        },
        {
          label: t('metrics.specialDefense'),
          ...getPokemonMetric(firstLegendary, 'special-defense'),
        },
      ]
    : [];
  const experienceColorClass = pokemonTypeColors.electric.split(' ')[0];

  return (
    <Layout variant='legendaries'>
      <div className='p-5'>
        <div className='mx-auto lg:max-w-[800px] container'>
          {firstLegendary ? (
            <>
              <article className='md:items-center gap-5 grid grid-cols-1 md:grid-cols-[300px_1fr] mt-8'>
                <div className='relative w-full h-60 md:h-72'>
                  <Image
                    src={getImage(firstLegendary)}
                    alt={firstLegendary.name}
                    fill
                    className='object-contain'
                  />
                </div>
                <div>
                  <p className='font-semibold text-6xl capitalize'>{firstLegendary.name}</p>
                  <p className='mt-3 text-sm'>{firstLegendaryDescription}</p>
                  {metrics.length > 0 ? (
                    <div className='gap-4 grid grid-cols-2 mt-5'>
                      {metrics.map(metric => (
                        <PokemonMetric
                          key={metric.label}
                          label={metric.label}
                          value={metric.value}
                          maxValue={metric.maxValue}
                          barColorClass={experienceColorClass}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
              <LegendarySlider pokemons={legendaryPokemons} />
            </>
          ) : (
            <p className='mt-8 text-gray-600'>{t('loadFailed')}</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
