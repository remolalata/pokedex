'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const Navigation = () => {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('pokedex'), href: '/pokedex' },
    { label: t('legendaries'), href: '/legendaries' },
  ];

  return (
    <>
      <nav className='h-6'>
        <button className='md:hidden' onClick={() => setIsOpen(true)} aria-label={t('openMenu')}>
          <Menu size={24} />
        </button>

        <div className='hidden md:block'>
          <ul className='flex gap-x-10'>
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`text-xl ${pathname === href ? 'border-b-2' : ''} hover:border-b-2 transition-all`}
              >
                <li>{label}</li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full bg-linear-to-b from-brand to-brand-foreground shadow-md transform transition-transform duration-300 z-40 rounded-b-2xl ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className='flex flex-col justify-center items-center gap-4 p-4 py-10'>
          <Image src={'/images/logo.svg'} alt='Pokedex' className='mb-4' width={138} height={51} />
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl ${pathname === href ? 'border-b-2' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className='z-30 fixed inset-0 bg-gray-900 opacity-50'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
