// File: LPiece.tsx
import React, { ForwardedRef, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import './styles.css';

type LPieceProps = HTMLMotionProps<'div'> & {
  className?: string;
};

const LPiece = forwardRef<HTMLDivElement, LPieceProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div ref={ref} className={`lPiece ${className || ''}`} {...props}>
        <div />
        <div />
      </motion.div>
    );
  }
);

LPiece.displayName = 'LPiece';

export default LPiece;
