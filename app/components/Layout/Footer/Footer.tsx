import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='p-5 text-center lg:text-left'>
      <div className='mx-auto container'>
        <p>
          <span>{t('designBy')} </span>
          <a
            href='https://www.figma.com/community/file/893705420616737018'
            target='_blank'
            rel='noopener noreferrer'
          >
            Emmanuel García
          </a>
          <span>. {t('licensedUnder')} </span>
          <a
            href='https://creativecommons.org/licenses/by/4.0/'
            target='_blank'
            rel='noopener noreferrer'
          >
            CC BY 4.0
          </a>
          <span>, {t('viaFigma')}</span>
        </p>
      </div>
    </footer>
  );
};
