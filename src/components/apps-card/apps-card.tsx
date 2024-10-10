import React, { useMemo, useState } from 'react';

import type { AppDataSource, UserAppDataSource } from '@/schemas/apps-schemes';
import type { CardProps } from '@nextui-org/react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';
import {
  Bolt,
  Eraser,
  FileStack,
  Import,
  PowerOff,
  RefreshCcw,
  SearchX,
  Trash,
  Trash2,
  Unplug
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';
import {
  AppSourceActionAlert,
  appSourceActionAlertContent,
  appSourceActionAlertTitle
} from '@/lib/constants/app-action-alert';
import { cn } from '@/lib/utils';
import { AppInfo } from '@/schemas/apps-schemes';

import AppLogo from '../logo/app-logo';
import AppConnectStatusBadge from './app-connect-status-badge';
import AppSyncStatusBadge from './app-sync-status-badge';

interface AppCardProperties {
  app: AppInfo;
  props?: CardProps;
  source?: UserAppDataSource;
  refreshConnectedApps: () => void;
}

const AppCard = ({ app, props, source, refreshConnectedApps }: AppCardProperties) => {
  const router = useRouter();

  const isDisabled = !source;

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState<AppSourceActionAlert | undefined>();
  const { mutate: disconnectApp } = trpc.apps.disconnectApp.useMutation({
    onSuccess: (result) => {
      if (result) {
        if (source) {
          // update to disconnect
          source.status = 3;
        }
        refreshConnectedApps();
        // success
      } else {
        // false
      }
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const { mutate: deleteAppDocuments } = trpc.apps.deleteAppDocuments.useMutation({
    onSuccess: ({ code, message }) => {
      if (code === 0) {
        if (source) {
          source.syncStatus = 4;
        }
      } else {
        toast.error(message);
      }
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const { mutate: removeFromSearch } = trpc.apps.removeFromSearch.useMutation({
    onSuccess: ({ code, message }) => {
      if (code === 0) {
        if (source) {
          toast.success('Start to remove from search');
          source.syncStatus = 6;
        }
      } else {
        toast.error(message);
      }
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const { mutate: importDocumentsData } = trpc.apps.importDocsData.useMutation({
    onSuccess: ({ code }) => {
      if (code === 0) {
        toast.success('Start to import docs and index data');
        if (source) {
          source.syncStatus = 1;
        }
      } else {
        toast.error('Import docs has some problem, please try it later');
      }
    },
    onError: (error) => {
      if (error.message === 'need_subscribe') {
        toast.error('Please subscribe to use this feature', {
          action: {
            label: 'GO',
            onClick: () => {
              router.push('/#pricing');
            }
          }
        });
      } else {
        toast.error(error.message);
      }
    }
    // onSettled: () => {}
  });

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
      if (error.message === 'need_subscribe') {
        toast.error('Please subscribe to use this feature', {
          action: {
            label: 'GO',
            onClick: () => {
              router.push('/#pricing');
            }
          }
        });
      } else {
        toast.error(error.message);
      }
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  const alert = (alertType: AppSourceActionAlert) => {
    setAlertType(alertType);

    if (alertType) {
      onOpen();
    }
  };

  const alertAction = () => {
    switch (alertType) {
      case AppSourceActionAlert.DisconnectApp: {
        return (
          <>
            <Button
              color='danger'
              onPress={() => {
                disconnectApp({ app: app.key });
                onClose();
              }}
            >
              Disconnect
            </Button>
          </>
        );
      }
      case AppSourceActionAlert.DeleteAppDocuments: {
        return (
          <>
            <Button
              color='danger'
              onPress={() => {
                deleteAppDocuments({ app: app.key });
                onClose();
              }}
            >
              Delete Documents
            </Button>
          </>
        );
      }
      case AppSourceActionAlert.RemoveFromSearch: {
        return (
          <>
            <Button
              color='danger'
              onPress={() => {
                removeFromSearch({ app: app.key });
                onClose();
              }}
            >
              Delete Documents
            </Button>
          </>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const configureDropdownItems = [
    {
      key: 'importDocuments',
      label: 'Import Documents',
      startContent: <Import size={14} />,
      onPress: () => {
        importDocumentsData({ app: app.key });
      },
      disableSyncStatus: [4, 6]
    },
    {
      key: 'reconnect',
      label: 'Reconnect',
      startContent: <Unplug size={14} />,
      onPress: () => {
        getOauthRequestUrl({
          app: app.key
        });
      },
      disableSyncStatus: [1, 4, 6]
    },
    {
      key: 'removeFromSearch',
      label: 'Remove from Search',
      danger: true,
      startContent: <SearchX size={14} />,
      onPress: () => {
        alert(AppSourceActionAlert.RemoveFromSearch);
      },
      disableSyncStatus: [1, 4, 5, 6, 7]
    },
    {
      key: 'deleteDocuments',
      label: 'Delete Documents',
      danger: true,
      startContent: <Trash2 size={14} />,
      onPress: () => {
        alert(AppSourceActionAlert.DeleteAppDocuments);
      },
      disableSyncStatus: [1, 4, 5, 6]
    },
    {
      key: 'disconnect',
      label: 'Disconnect',
      danger: true,
      startContent: <PowerOff size={14} />,
      onPress: () => {
        alert(AppSourceActionAlert.DisconnectApp);
      },
      disableSyncStatus: [1, 4, 6]
    }
  ];

  const disabledKeys = useMemo(() => {
    // eslint-disable-next-line unicorn/prefer-ternary
    if (source) {
      return configureDropdownItems
        .filter((item) => {
          return item.disableSyncStatus.includes(source.syncStatus);
        })
        .map((item) => {
          return item.key;
        });
    } else {
      return [];
    }
  }, [configureDropdownItems, source]);

  const DocumentManagementButton = () => {
    return source ? (
      <Button
        size='sm'
        variant='flat'
        color='default'
        startContent={<FileStack size={'small'} width={14} />}
        as={Link}
        href={`/apps/${app.key}`}
      >
        Management
      </Button>
    ) : (
      <></>
    );
  };

  return (
    <>
      <Card className='flex w-full flex-none p-3' shadow='sm' {...props}>
        <CardBody className='px-4 pb-1'>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex max-w-[80%] flex-col gap-1'>
              <p className='text-medium font-medium'>{app.name}</p>
              <p className='text-small text-default-500'>{app.website}</p>
            </div>
            <AppLogo app={app.key} size={32} />
            {/* <Image src={app.icon} alt={app.name} width={32} height={32} /> */}
            {/* <Avatar className='bg-white' src={app.icon} /> */}
          </div>
          <p className='pt-4 text-small text-default-500'>
            {/* With Notion, you can import workspaces, pages, databases, and more. */}
            {app.desc}
          </p>
        </CardBody>
        <CardFooter className=''>
          {source && source.status === 1 ? (
            <>
              <div className='flex w-full flex-col gap-2'>
                <div className='flex w-full items-center justify-between'>
                  <AppSyncStatusBadge syncStatus={source?.syncStatus ?? -1} />
                  <AppConnectStatusBadge status={source?.status ?? -1} />
                </div>
                <div className='flex-cul flex justify-between gap-2 md:flex-row'>
                  <DocumentManagementButton />
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size='sm'
                        variant='flat'
                        isDisabled={
                          isDisabled || source.syncStatus === 4 || source.syncStatus === 6
                        }
                        startContent={loading ? <></> : <Bolt size={'small'} width={14} />}
                        isLoading={loading}
                      >
                        Configure
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label='app config actions' disabledKeys={disabledKeys}>
                      {configureDropdownItems.map((item) => {
                        return (
                          <DropdownItem
                            key={item.key}
                            color={item.danger ? 'danger' : 'default'}
                            className={item.danger ? 'text-danger' : ''}
                            startContent={item.startContent}
                            onPress={item.onPress}
                          >
                            {item.label}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </>
          ) : (
            <div className='flex w-full flex-col justify-between gap-2 md:flex-row'>
              <DocumentManagementButton />

              <Button
                className={cn('', {
                  'w-full': !source
                })}
                size='sm'
                color={'primary'}
                variant='solid'
                startContent={<Unplug size={14} />}
                isLoading={loading}
                onPress={() => {
                  getOauthRequestUrl({ app: app.key });
                }}
              >
                Connect
              </Button>
            </div>
          )}
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
                <p>{alertType && appSourceActionAlertContent(alertType, app.name)}</p>
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

export default AppCard;
