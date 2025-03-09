'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

interface AnimatedGradientTextProps {
  text: string;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({ text }) => {
  return (
    <>
    <div className="relative w-fit overflow-hidden">
      <MotionDiv
        className="text-4xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent"
        animate={{ backgroundPositionX: ['0%', '100%'] }} // Moves the gradient
        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
        style={{
          backgroundSize: '200% 100%', // Expands the gradient width
          whiteSpace: 'nowrap',
          display: 'inline-block',
        }}
      >
        {text}
      </MotionDiv>
    </div>
    <div className='text-4xl font-bold bg-gradient-to-r from-red-500 via-blue-500 to-green-500 h-10 w-10' >
        <p>{text}</p>
    </div>
    </>
  );
};

export default AnimatedGradientText;
