export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListItemWithId {
  name: string;
  id: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
  description?: string;
}

export interface PokemonCry {
  latest: string;
  legacy: string;
}

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface PokemonForm {
  name: string;
  url: string;
}

export interface HeldItemVersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

export interface HeldItem {
  item: NamedAPIResource;
  version_details: HeldItemVersionDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  order: number | null;
  version_group: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

export interface PastAbility {
  generation: NamedAPIResource;
  abilities: PokemonAbility[];
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface PastType {
  generation: NamedAPIResource;
  types: PokemonTypeSlot[];
}

export interface DreamWorldSprite {
  front_default: string | null;
  front_female: string | null;
}

export interface HomeSprite {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface OfficialArtworkSprite {
  front_default: string | null;
  front_shiny: string | null;
}

export interface OtherSprites {
  dream_world?: DreamWorldSprite;
  home?: HomeSprite;
  'official-artwork'?: OfficialArtworkSprite;
  showdown?: Record<string, string | null>;
}

export interface VersionSprites {
  [version: string]: Partial<PokemonSprites>;
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: OtherSprites;
  versions?: Record<string, VersionSprites>;
}

export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;

  location_area_encounters: string;

  abilities: PokemonAbility[];
  cries: PokemonCry;
  forms: PokemonForm[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  moves: PokemonMove[];
  past_abilities: PastAbility[];
  past_types: PastType[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonTypeSlot[];
}
