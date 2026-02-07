import Image from 'next/image';
import { NOT_FOUND_SUBTITLE, NOT_FOUND_TITLE, RETURN } from './lib/config';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='bg-error min-h-screen flex flex-col gap-y-5 items-center justify-center p-5 font-bold text-white text-2xl'>
      <div className='relative w-full h-64'>
        <Image
          src={'/images/not-found/hero.svg'}
          alt='Not Found'
          fill
          className='object-contain'
          priority
        />
      </div>
      <div className='text-center'>
        <div>{NOT_FOUND_TITLE}</div>
        <div className='text-black'>{NOT_FOUND_SUBTITLE}</div>
      </div>
      <div>
        <Link
          href='/'
          className='inline-flex mt-10 px-4 rounded-lg text-sm py-3 font-medium transition duration-150 shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)] active:translate-y-[2px] active:shadow-none cursor-pointer bg-yellow-400 text-black'
        >
          <span className='relative top-[-2px] font-bold'>{RETURN}</span>
        </Link>
      </div>
    </div>
  );
}
