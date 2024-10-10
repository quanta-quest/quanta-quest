'use client';

import React, { useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';
import { type user_app_source } from '@prisma/client';
import { Import, PowerOff, SearchX, Trash2, Unplug } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';
import {
  AppSourceActionAlert,
  appSourceActionAlertContent,
  appSourceActionAlertTitle
} from '@/lib/constants/app-action-alert';
import { type AppInfo } from '@/schemas/apps-schemes';

import AppConnectStatusBadge from '../apps-card/app-connect-status-badge';
import AppSyncStatusBadge from '../apps-card/app-sync-status-badge';
import AppLogo from '../logo/app-logo';

interface AppDetailCardProperties {
  appInfo: AppInfo;
  userAppSource: user_app_source;
}

const AppDetailCard = ({ appInfo, userAppSource }: AppDetailCardProperties) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [alertType, setAlertType] = useState<AppSourceActionAlert | undefined>();

  const connectedAt = userAppSource.connected_at;
  const lastSyncAt = userAppSource.last_sync_at;

  const alert = (alertType: AppSourceActionAlert) => {
    setAlertType(alertType);

    if (alertType) {
      onOpen();
    }
  };

  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const { mutate: disconnectApp } = trpc.apps.disconnectApp.useMutation({
    onSuccess: (result) => {
      if (result) {
        if (userAppSource) {
          // update to disconnect
          userAppSource.status = 3;
        }
        // success
        toast.success('Disconnect with app success. ');
      } else {
        // false
        toast.error('Disconnect with app failed. ');
      }
    },
    onMutate: () => {
      setIsDisconnecting(true);
    },
    onSettled: () => {
      setIsDisconnecting(false);
    }
  });

  const DisconnectAlertButton = () => {
    return (
      <>
        <Button
          color='danger'
          onPress={() => {
            disconnectApp({ app: appInfo.key });
            onClose();
          }}
        >
          Disconnect
        </Button>
      </>
    );
  };

  const [isDeletingAppDocuments, setIsDeletingAppDocuments] = useState(false);
  const { mutate: deleteAppDocuments } = trpc.apps.deleteAppDocuments.useMutation({
    onSuccess: ({ code, message }) => {
      if (code === 0) {
        if (userAppSource) {
          userAppSource.sync_status = 4;
        }
        // refreshConnectedApps();
        // success
        toast.success('Start to delete documents. ');
      } else {
        toast.error(message);
      }
    },
    onMutate: () => {
      setIsDeletingAppDocuments(true);
    },
    onSettled: () => {
      setIsDeletingAppDocuments(false);
    }
  });

  const DeleteAppDocumentsButton = () => {
    return (
      <>
        <Button
          color='danger'
          onPress={() => {
            deleteAppDocuments({ app: appInfo.key });
            onClose();
          }}
        >
          Delete Documents
        </Button>
      </>
    );
  };

  const [isRemovingFromSearch, setIsRemovingFromSearch] = useState(false);
  const { mutate: removeFromSearch } = trpc.apps.removeFromSearch.useMutation({
    onSuccess: ({ code, message }) => {
      if (code === 0) {
        // success
        toast.success('Start to remove from search. Please wait.');
      } else {
        toast.error(message);
      }
    },
    onMutate: () => {
      setIsRemovingFromSearch(true);
    },
    onSettled: () => {
      setIsRemovingFromSearch(false);
    }
  });

  const RemoveFromSearchButton = () => {
    return (
      <>
        <Button
          color='danger'
          onPress={() => {
            removeFromSearch({ app: appInfo.key });
            onClose();
          }}
        >
          Remove from search
        </Button>
      </>
    );
  };

  const alertAction = () => {
    switch (alertType) {
      case AppSourceActionAlert.DisconnectApp: {
        return <DisconnectAlertButton />;
      }
      case AppSourceActionAlert.DeleteAppDocuments: {
        return <DeleteAppDocumentsButton />;
      }
      case AppSourceActionAlert.RemoveFromSearch: {
        return <RemoveFromSearchButton />;
      }
      default: {
        return <></>;
      }
    }
  };

  const [isImportingData, setIsImportingData] = useState(false);
  const { mutate: importDocumentsData } = trpc.apps.importDocsData.useMutation({
    onSuccess: ({ code }) => {
      if (code === 0) {
        toast.success('Start to import docs and index data');
        if (userAppSource) {
          userAppSource.sync_status = 1;
        }
      } else {
        toast.error('Import docs has some problem, please try again later');
      }
    },
    onError: (error) => {
      toastErrorMessage(error.message);
    },
    onMutate: () => {
      setIsImportingData(true);
    },
    onSettled: () => {
      setIsImportingData(false);
    }
  });

  const toastErrorMessage = (message: string) => {
    if (message === 'need_subscribe') {
      toast.error('Please subscribe to use this feature', {
        action: {
          label: 'GO',
          onClick: () => {
            router.push('/#pricing');
          }
        }
      });
    } else {
      toast.error(message);
    }
  };

  const [getingOauthRequestUrl, setGetingOauthRequestUrl] = useState(false);
  const { mutate: getOauthRequestUrl } = trpc.apps.getAppOauthRequestUrl.useMutation({
    onSuccess: (result) => {
      if (result) {
        router.push(result);
        // success
      } else {
        // false
        toast.error('Get auth url failed');
      }
    },
    onError: (error) => {
      toastErrorMessage(error.message);
    },
    onMutate: () => {
      setGetingOauthRequestUrl(true);
    },
    onSettled: () => {
      setGetingOauthRequestUrl(false);
    }
  });

  const actionDisable = (syncStatusList: number[], statusList: number[]) => {
    if (statusList.includes(userAppSource.status)) {
      return true;
    }

    return syncStatusList.includes(userAppSource.sync_status);
  };

  return (
    <>
      <Card className='overflow-visible p-4'>
        <CardHeader>
          <div className='flex w-full justify-between'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-4'>
                <h2 className='text-2xl font-bold'>{appInfo.name}</h2>
                <AppConnectStatusBadge status={userAppSource.status} />
                {userAppSource.status === 1 && (
                  <AppSyncStatusBadge syncStatus={userAppSource.sync_status} />
                )}
              </div>

              <div className='flex justify-start gap-2 text-muted-foreground'>
                <p>{appInfo.desc}</p>
              </div>
            </div>
            <div className='flex h-16 w-16 items-center justify-center rounded-xl border'>
              <AppLogo app={appInfo.key} size={48} />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className='flex w-full flex-col justify-start gap-6 md:flex-row'>
            <div className='flex flex-col gap-2'>
              <p className='text-muted-foreground'>Connected At</p>
              <p>
                {connectedAt ? (
                  <>
                    {connectedAt.toLocaleDateString()} {connectedAt.toLocaleTimeString()}
                  </>
                ) : (
                  <>-</>
                )}
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-muted-foreground'>Last Sync At</p>
              <p>
                {lastSyncAt ? (
                  <>
                    {lastSyncAt.toLocaleDateString()} {lastSyncAt.toLocaleTimeString()}
                  </>
                ) : (
                  <>-</>
                )}
              </p>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className='flex w-full flex-col justify-end gap-4 md:flex-row'>
            {userAppSource.status === 1 && (
              <>
                <Button
                  key='importDocuments'
                  size='sm'
                  color='default'
                  startContent={<Import size={14} />}
                  onPress={() => {
                    importDocumentsData({ app: appInfo.key });
                  }}
                  isLoading={isImportingData}
                  isDisabled={actionDisable([4, 6], [0, 2, 3])}
                >
                  Import Documents
                </Button>
                <Button
                  key='reconnect'
                  size='sm'
                  color='default'
                  startContent={<Unplug size={14} />}
                  onPress={() => {
                    getOauthRequestUrl({
                      app: appInfo.key
                    });
                  }}
                  isLoading={getingOauthRequestUrl}
                  isDisabled={actionDisable([1, 4, 6], [])}
                >
                  Reconnect
                </Button>
                <Button
                  key='removeFromSearch'
                  size='sm'
                  color='danger'
                  variant='flat'
                  startContent={<SearchX size={14} />}
                  onPress={() => {
                    alert(AppSourceActionAlert.RemoveFromSearch);
                  }}
                  isLoading={isRemovingFromSearch}
                  isDisabled={actionDisable([1, 4, 5, 6, 7], [0])}
                >
                  Remove from Search
                </Button>
                <Button
                  key='deleteDocuments'
                  size='sm'
                  color='danger'
                  variant='flat'
                  startContent={<Trash2 size={14} />}
                  onPress={() => {
                    alert(AppSourceActionAlert.DeleteAppDocuments);
                  }}
                  isLoading={isDeletingAppDocuments}
                  isDisabled={actionDisable([1, 4, 5, 6], [0])}
                >
                  Delete Documnets
                </Button>
                <Button
                  key='disconnect'
                  size='sm'
                  color='danger'
                  variant='flat'
                  startContent={<PowerOff size={14} />}
                  onPress={() => {
                    alert(AppSourceActionAlert.DisconnectApp);
                  }}
                  isLoading={isDisconnecting}
                  isDisabled={actionDisable([1, 4, 6], [])}
                >
                  Disconnect
                </Button>
              </>
            )}
            {userAppSource.status !== 1 && (
              <Button
                key='connect'
                size='sm'
                color='primary'
                variant='solid'
                startContent={<Unplug size={14} />}
                onPress={() => {
                  getOauthRequestUrl({ app: appInfo.key });
                }}
                isLoading={getingOauthRequestUrl}
              >
                Connect
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {alertType && appSourceActionAlertTitle(alertType)}
              </ModalHeader>
              <ModalBody>
                {alertType && appSourceActionAlertContent(alertType, appInfo.name)}
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                {alertAction()}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppDetailCard;
