// File: TPiece.tsx
import React, { ForwardedRef, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import './styles.css';

type TPieceProps = HTMLMotionProps<'div'> & {
  className?: string;
};

const TPiece = forwardRef<HTMLDivElement, TPieceProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div ref={ref} className={`tPiece ${className || ''}`} {...props}>
        <div />
        <div />
      </motion.div>
    );
  }
);

TPiece.displayName = 'TPiece';

export default TPiece;
