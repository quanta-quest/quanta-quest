// File: JPiece.tsx
import React, { ForwardedRef, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import './styles.css';

type JPieceProps = HTMLMotionProps<'div'> & {
  className?: string;
};

const JPiece = forwardRef<HTMLDivElement, JPieceProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div ref={ref} className={`jPiece ${className || ''}`} {...props}>
        <div />
        <div />
      </motion.div>
    );
  }
);

JPiece.displayName = 'JPiece';

export default JPiece;
