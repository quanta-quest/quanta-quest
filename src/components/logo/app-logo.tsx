import React from 'react';

import Image from 'next/image';

import Dropbox from './dropbox';
import { GoogleGmail } from './gmail';
import { MageNotion } from './notion';

interface AppLogoProperties {
  app: string;
  size: number;
}

const AppLogo = ({ app, size }: AppLogoProperties) => {
  switch (app) {
    case 'notion': {
      return <MageNotion width={size} height={size} />;
      // return <UniformSvgLogo SvgComponent={MageNotion} size={size} />;
    }
    case 'gmail': {
      return <GoogleGmail width={size} height={size} />;
      // return <UniformSvgLogo SvgComponent={GoogleGmail} size={size} />;
    }
    case 'dropbox': {
      return <Dropbox width={size} height={size} />;
    }
    case 'raindrops': {
      return (
        <Image src='/logos/raindrops.jpeg' width={size} height={size} alt='raindrops.io logo' />
      );
    }
    // No default
  }

  return <div>{app}</div>;
};

export default AppLogo;
