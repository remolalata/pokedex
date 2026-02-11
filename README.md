# Pokedex

A modern Pokedex app built with Next.js App Router, TypeScript, Tailwind CSS, and PokeAPI.

## How the app works

The app is split into localized routes under `app/[locale]` and uses a mix of server and client components:

- Server-rendered pages fetch Pokemon data from PokeAPI through helpers in `app/lib/api`.
- Client components handle interactive UI like search and sliders.
- Internationalization is managed with `next-intl` using `messages/en.json`.
- Shared helpers in `app/lib/helpers` normalize images, stats, and display data.

## Core functionalities

- Home page with featured content and navigation.
- Pokedex list page with searchable Pokemon cards.
- Pokemon details view (including modal route support).
- Legendary page with first legendary spotlight (image, name, description).
- Reusable metrics display (HP, experience, attack, defense, special attack, special defense).
- Horizontal legendary slider with snap scrolling and arrow navigation.
- Robust image fallback handling for missing sprite sources.
- Localized UI strings via `next-intl`.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl
- Vitest + Testing Library

## Project structure

- `app/[locale]`: localized routes/pages
- `app/components`: reusable UI components
- `app/lib/api`: API fetch logic and endpoint builders
- `app/lib/helpers`: transformation and UI helper utilities
- `app/lib/constants`: shared constants (famous/legendary Pokemon, colors, etc.)
- `messages`: translation dictionaries
- `i18n`: routing/request configuration

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Useful scripts

- `npm run dev`: run local development server
- `npm run build`: create production build
- `npm run start`: run production server
- `npm run lint`: run ESLint
- `npm run test`: run Vitest
- `npm run test:watch`: run Vitest in watch mode
- `npm run test:coverage`: run coverage

## Design credit

UI design inspired by the community Figma file:

- [Pokedex - Figma Community](https://www.figma.com/community/file/893705420616737018/pokedex)

## Attributions

- See `ATTRIBUTIONS.md` for third-party asset credits (including favicon attribution).
