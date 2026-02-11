'use client';

import { pokemonTypeColors } from '@/app/lib/constants';
import { getImage, getPokemonMetric } from '@/app/lib/helpers';
import { PokemonDetail } from '@types';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { PokemonMetric } from '../Pokemons/PokemonMetric';
import { LegendarySlider } from './LegendarySlider';

interface LegendariesLabels {
  healthPoints: string;
  experience: string;
  attack: string;
  defense: string;
  specialAttack: string;
  specialDefense: string;
  loadFailed: string;
  descriptionUnavailable: string;
}

interface LegendariesContentProps {
  pokemons: PokemonDetail[];
  descriptionsById: Record<string, string>;
  labels: LegendariesLabels;
}

const getRandomPokemon = (pokemons: PokemonDetail[]): PokemonDetail | null => {
  if (!pokemons.length) return null;

  const randomIndex = Math.floor(Math.random() * pokemons.length);
  return pokemons[randomIndex];
};

export const LegendariesContent = ({
  pokemons,
  descriptionsById,
  labels,
}: LegendariesContentProps) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(() =>
    getRandomPokemon(pokemons),
  );

  useEffect(() => {
    if (!pokemons.length) {
      setSelectedPokemon(null);
      return;
    }

    setSelectedPokemon(current => {
      if (current && pokemons.some(pokemon => pokemon.id === current.id)) {
        return current;
      }

      return getRandomPokemon(pokemons);
    });
  }, [pokemons]);

  const metrics = useMemo(() => {
    if (!selectedPokemon) return [];

    return [
      { label: labels.healthPoints, ...getPokemonMetric(selectedPokemon, 'hp') },
      { label: labels.experience, ...getPokemonMetric(selectedPokemon, 'experience') },
      { label: labels.attack, ...getPokemonMetric(selectedPokemon, 'attack') },
      { label: labels.defense, ...getPokemonMetric(selectedPokemon, 'defense') },
      { label: labels.specialAttack, ...getPokemonMetric(selectedPokemon, 'special-attack') },
      { label: labels.specialDefense, ...getPokemonMetric(selectedPokemon, 'special-defense') },
    ];
  }, [labels.attack, labels.defense, labels.experience, labels.healthPoints, labels.specialAttack, labels.specialDefense, selectedPokemon]);

  const experienceColorClass = pokemonTypeColors.electric.split(' ')[0];

  if (!selectedPokemon) {
    return <p className='mt-8 text-gray-600'>{labels.loadFailed}</p>;
  }

  const description =
    descriptionsById[String(selectedPokemon.id)] ?? labels.descriptionUnavailable;

  return (
    <>
      <article className='md:items-center gap-5 grid grid-cols-1 md:grid-cols-[300px_1fr] mt-8'>
        <div className='relative w-full h-60 md:h-72'>
          <Image
            src={getImage(selectedPokemon)}
            alt={selectedPokemon.name}
            fill
            className='object-contain'
          />
        </div>
        <div>
          <p className='font-semibold text-6xl capitalize'>{selectedPokemon.name}</p>
          <p className='mt-3 text-sm'>{description}</p>
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
      <LegendarySlider
        pokemons={pokemons}
        selectedPokemonId={selectedPokemon.id}
        onSelectPokemon={setSelectedPokemon}
      />
    </>
  );
};
