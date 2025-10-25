'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

export const Modal = ({ isOpen, children }: ModalProps) => {
  const router = useRouter();

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

  // detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const mobileVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' },
  };

  const desktopVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => router.back()}
          />

          {/* Modal */}
          <motion.div
            className={`fixed z-50 bg-white dark:bg-neutral-900 shadow-xl
              ${isMobile ? 'inset-x-0 bottom-0 rounded-t-2xl' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-full max-w-lg'}
              max-h-[90vh] overflow-y-auto`}
            variants={isMobile ? mobileVariants : desktopVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className='flex justify-end p-4'>
              <button onClick={() => router.back()} aria-label='Close modal'>
                <X className='w-5 h-5 text-white' />
              </button>
            </div>
            <div className='p-4'>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
