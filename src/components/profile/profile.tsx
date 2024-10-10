'use client';

import React, { useEffect } from 'react';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { trpc } from '@/app/_trpc/client';
import MaxWidthWrapper from '@/components/ui/max-width-warpper';

const ProfilePage = () => {
  const { user: kindeUser } = useKindeBrowserClient();
  const router = useRouter();
  const searchParameters = useSearchParams();
  const action = searchParameters.get('action');

  const { data: user, isLoading } = trpc.user.getUserInfo.useQuery();

  const { mutate: createPortal } = trpc.stripe.createPortalUrl.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        router.push(data.url);
      }
    }
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    //handle action
    if (action === 'checkout-success') {
      onOpen();
    }
  }, [action, onOpen]);

  return (
    <>
      <MaxWidthWrapper className='flex h-full flex-col gap-6'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center gap-x-3 py-8'>
            <h1 className='text-3xl font-bold leading-9 text-default-foreground'>User Profile</h1>
          </div>
          <Card className='w-full p-6'>
            <CardBody className='justify-between'>
              <div className='flex gap-5'>
                <Avatar isBordered radius='full' size='md' src={kindeUser?.picture ?? ''} />
                <div className='flex flex-col items-start justify-center gap-1'>
                  <h4 className='text-small font-semibold leading-none text-default-600'>
                    {kindeUser?.given_name} {kindeUser?.family_name}
                  </h4>
                  <h5 className='text-small tracking-tight text-default-400'>{kindeUser?.email}</h5>
                </div>
              </div>
              {/* <Button
              className={isFollowed ? 'border-default-200 bg-transparent text-foreground' : ''}
              color='primary'
              radius='full'
              size='sm'
              variant={isFollowed ? 'bordered' : 'solid'}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button> */}
            </CardBody>
          </Card>

          <Card className='w-full p-3'>
            <CardHeader className=''>
              <div className='flex items-start justify-start'>
                <h2 className='text-xl font-semibold'>Billing</h2>
              </div>
            </CardHeader>
            <CardBody className='flex flex-col'>
              <div className='flex justify-between'>
                <h3 className='text-lg font-semibold'>Subscription:</h3>
                <Chip variant='flat' color={user && user.status === 1 ? 'success' : 'default'}>
                  {user
                    ? user.status === 0
                      ? 'Trialiing'
                      : user.status === 1
                        ? 'Active'
                        : 'Expired'
                    : 'Loading...'}
                </Chip>
              </div>
            </CardBody>
            <CardFooter className='flex justify-end'>
              {user && user.status === 1 && (
                <Button
                  color='primary'
                  onPress={() => {
                    createPortal();
                  }}
                >
                  Manage
                </Button>
              )}
              {user && user.status !== 1 && (
                <Button color='primary' as={Link} href='/#pricing'>
                  Subscribe
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </MaxWidthWrapper>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>🎉 Subscription Successful!</ModalHeader>
              <ModalBody>
                <p>
                  Thank you for your support! We&apos;re thrilled to have you on board. We hope
                  you&apos;ll enjoy our services to the fullest. If you have any questions, please
                  don&apos;t hesitate to reach out.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='solid' onPress={onClose}>
                  Start Exploring
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePage;
