import React from 'react';

import { Chip } from '@nextui-org/react';

interface AppConnectStatusBadgeProperties {
  status: number;
}

const AppConnectStatusBadge = ({ status }: AppConnectStatusBadgeProperties) => {
  const getAppConnectStatus = () => {
    switch (status) {
      case 0: {
        return 'Pendding';
      }
      case 1: {
        return 'Connected';
      }
      case 2: {
        return 'Failed';
      }
      case 3: {
        return 'Disconnected';
      }
      default: {
        return 'Unknown';
      }
    }
  };
  const badgeColor = () => {
    switch (status) {
      case 0: {
        return 'default';
      }
      case 1: {
        return 'success';
      }
      case 2: {
        return 'danger';
      }
      default: {
        return 'warning';
      }
    }
  };
  return (
    <Chip size='sm' color={badgeColor()} variant='flat'>
      {getAppConnectStatus()}
    </Chip>
  );
};

export default AppConnectStatusBadge;
