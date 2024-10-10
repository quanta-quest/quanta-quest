import React from 'react';

import { Chip } from '@nextui-org/react';

import { getAppSyncStatus } from '@/lib/constants/app-constants';

interface AppSyncStatusBadgeProperties {
  syncStatus: number;
}

const AppSyncStatusBadge = ({ syncStatus }: AppSyncStatusBadgeProperties) => {
  const getSyncStatusVariant = () => {
    switch (syncStatus) {
      case 0: {
        // return 'secondary';
        return 'flat';
      }
      case 1:
      case 2: {
        // return 'default';
        return 'solid';
      }
      case 3:
      case 4:
      case 5: {
        return 'solid';
        // return 'destructive';
      }
      case 6:
      case 7: {
        return 'flat';
      }
      default: {
        return 'light';
      }
    }
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 0: {
        return 'default';
      }
      case 1:
      case 2: {
        // return 'default';
        return 'primary';
      }
      case 3:
      case 4:
      case 5: {
        return 'danger';
        // return 'destructive';
      }
      case 6:
      case 7: {
        return 'warning';
      }
      default: {
        return 'warning';
      }
    }
  };
  return (
    <>
      <Chip variant={getSyncStatusVariant()} color={getSyncStatusColor()} size='sm'>
        {getAppSyncStatus(syncStatus ?? -1)}
      </Chip>
    </>
  );
};

export default AppSyncStatusBadge;
