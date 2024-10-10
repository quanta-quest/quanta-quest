// File: ZPiece.tsx
import React, { ForwardedRef, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import './styles.css';

type ZPieceProps = HTMLMotionProps<'div'> & {
  className?: string;
};

const ZPiece = forwardRef<HTMLDivElement, ZPieceProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div ref={ref} className={`zPiece ${className || ''}`} {...props}>
        <div />
        <div />
      </motion.div>
    );
  }
);

ZPiece.displayName = 'ZPiece';

export default ZPiece;
