// File: IPiece.tsx
import React, { ForwardedRef, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import './styles.css';

type IPieceProps = HTMLMotionProps<'div'> & {
  className?: string;
};

const IPiece = forwardRef<HTMLDivElement, IPieceProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div ref={ref} className={`iPiece ${className || ''}`} {...props}>
        <div />
      </motion.div>
    );
  }
);

IPiece.displayName = 'IPiece';

export default IPiece;
