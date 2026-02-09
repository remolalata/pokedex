import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className='bg-error min-h-screen flex flex-col gap-y-5 items-center justify-center p-5 font-bold text-white text-2xl'>
      <div className='relative w-full h-64'>
        <Image
          src={'/images/not-found/hero.svg'}
          alt={t('imageAlt')}
          fill
          className='object-contain'
          priority
        />
      </div>
      <div className='text-center'>
        <div>{t('title')}</div>
        <div className='text-black'>{t('subtitle')}</div>
      </div>
      <div>
        <Link
          href='/'
          className='inline-flex mt-10 px-4 rounded-lg text-sm py-3 font-medium transition duration-150 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-none cursor-pointer bg-yellow-400 text-black'
        >
          <span className='relative top-[-2px] font-bold'>{t('return')}</span>
        </Link>
      </div>
    </div>
  );
}
