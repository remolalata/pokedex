import { pokemonTypeColors } from '@constants';
import { PokemonType } from '@types';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PokemonTypeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PokemonType;
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  children?: ReactNode;
}

export const PokemonTypeButton = ({
  variant = 'normal',
  size = 'small',
  rounded = false,
  children,
  className = '',
  ...props
}: PokemonTypeButtonProps) => {
  const typeClass = pokemonTypeColors[variant];
  const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';

  const sizeClassMap: Record<NonNullable<PokemonTypeButtonProps['size']>, string> = {
    small: 'text-xs py-2 font-normal',
    medium: 'text-sm py-3 font-medium',
    large: 'text-lg py-4 font-semibold',
  };

  const sizeClass = sizeClassMap[size];

  return (
    <button
      type='button'
      className={`px-4 ${roundedClass} ${sizeClass} transition duration-150
        shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-none
        ${typeClass} ${className}`}
      {...props}
    >
      {children || variant}
    </button>
  );
};
