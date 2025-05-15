interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Pokédex', href: '/pokedex' },
  { label: 'Lgendaries', href: '/legendaries' },
];
