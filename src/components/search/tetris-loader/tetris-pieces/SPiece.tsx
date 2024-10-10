// File: SPiece.tsx
import React, { ForwardedRef, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import './styles.css';

type SPieceProps = HTMLMotionProps<'div'> & {
  className?: string;
};

const SPiece = forwardRef<HTMLDivElement, SPieceProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div ref={ref} className={`sPiece ${className || ''}`} {...props}>
        <div />
        <div />
      </motion.div>
    );
  }
);

SPiece.displayName = 'SPiece';

export default SPiece;
