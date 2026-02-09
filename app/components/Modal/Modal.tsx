'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useIsMobile } from '@/app/hooks';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  backgroundColor?: string;
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const Modal = ({ isOpen, children, backgroundColor }: ModalProps) => {
  const t = useTranslations('Modal');
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='z-40 fixed inset-0 bg-black/40 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => router.back()}
          />

          <motion.div
            className={`fixed z-50 shadow-xl
              ${isMobile ? 'inset-x-0 bottom-0 rounded-t-2xl' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-full max-w-lg'}
              overflow-y-auto`}
            variants={modalVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className='relative bg-white'>
              <div className='absolute z-0 inset-0 opacity-50' style={{ backgroundColor }}></div>
              <div className='z-10 relative flex justify-end p-4'>
                <button
                  type='button'
                  onClick={() => router.back()}
                  aria-label={t('close')}
                  className='cursor-pointer'
                >
                  <X className='text-white' size={24} strokeWidth={4} />
                </button>
              </div>
              <div className='z-10 relative'>{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
