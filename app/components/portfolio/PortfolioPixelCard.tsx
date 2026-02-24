"use client";

import { useEffect, useState } from 'react';
import PixelCard from './pixelCard';
import { IoMdClose } from "react-icons/io";

interface PortfolioPixelCardProps {
  variant?: 'default' | 'blue' | 'yellow' | 'pink';
  className?: string;
  cardContent: React.ReactNode;
  modalContent: React.ReactNode;
}

export default function PortfolioPixelCard({
  variant = 'default',
  className,
  cardContent,
  modalContent
}: PortfolioPixelCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      <PixelCard variant={variant} className={className} gap={5} onClick={() => setIsOpen(true)}>
        {cardContent}
      </PixelCard>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-[95%] xl:w-[60%] rounded-lg bg-[#0b0b0d]/90 p-6 border border-white/50"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-6">
              {modalContent}
              <button
                className="group mx-auto rounded-sm border border-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-[#f76855] hover:text-[#f76855] cursor-pointer"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
              >
                Close <IoMdClose className="inline ml-1 text-white text-xl transition-colors group-hover:text-[#f76855]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
