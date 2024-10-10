import React, { ComponentType, SVGProps } from 'react';

interface UniformSvgLogoProperties {
  SvgComponent: ComponentType<SVGProps<SVGSVGElement>>;
  size?: number;
  className?: string;
}

const UniformSvgLogo: React.FC<UniformSvgLogoProperties> = ({
  SvgComponent,
  size = 100,
  className = ''
}) => {
  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <SvgComponent width='100%' height='100%' preserveAspectRatio='xMidYMid meet' />
    </div>
  );
};

export default UniformSvgLogo;
