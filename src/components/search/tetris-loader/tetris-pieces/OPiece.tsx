// File: OPiece.tsx
import React, { ForwardedRef, forwardRef } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import './styles.css';

type OPieceProps = HTMLMotionProps<'div'> & {
  className?: string;
};

const OPiece = forwardRef<HTMLDivElement, OPieceProps>(
  ({ className, ...props }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <motion.div ref={ref} className={`oPiece ${className || ''}`} {...props}>
        <div />
      </motion.div>
    );
  }
);

OPiece.displayName = 'OPiece';

export default OPiece;
