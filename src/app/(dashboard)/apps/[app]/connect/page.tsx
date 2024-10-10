'use client';

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';
import MaxWidthWrapper from '@/components/ui/max-width-warpper';

// 这个页面接收到notion的回调，获取code，然后发送给后端兑换accessToken
// notion: http://localhost:3000/apps/notion/connect?code=03e6f7e2-98b7-46c9-9e5d-8c78265ff7e3&state=
// gmail: http://localhost:3000/apps/gmail/connect?code=4/0AQlEd8xqoOj52pO3HtnITSGUI7XzRDNtnVKdeOdslq4CeE-ynPU31l4-wYN5dNl8cR3ZjA&scope=https://www.googleapis.com/auth/gmail.readonly

const Page = ({ params }: { params: { app: string } }) => {
  const NO_RECOGNIZE_APP_MSG = 'Not recognize the app';
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParameters = useSearchParams();
  const code = searchParameters.get('code');
  const connectError = searchParameters.get('error');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const { app } = params;

  const { data: apps } = trpc.apps.getAppSources.useQuery();
  const appInfo = apps?.find((a) => a.key === app);

  const [connecting, setConnecting] = useState<boolean>(true);
  const [success, setSuccess] = useState(false);

  const { mutate: connectApp } = trpc.apps.oauthCallback.useMutation({
    onSuccess: () => {
      // success
      setSuccess(true);

      if (appInfo) {
        toast.success(`Connect to ${appInfo.name} success`);
        //自动跳转到apps
        router.push('/apps');
      } else {
        toast.error(NO_RECOGNIZE_APP_MSG);
      }
    },
    onError: () => {
      setSuccess(false);

      if (appInfo) {
        toast.error(`Connect to ${appInfo.name} failed`);
      } else {
        toast.error(NO_RECOGNIZE_APP_MSG);
      }
    },
    onMutate() {
      setConnecting(true);
    },
    onSettled() {
      setConnecting(false);
    }
  });

  useEffect(() => {
    if (appInfo) {
      if (connectError && connectError != '') {
        // have error, show failed
        setConnecting(false);
        setSuccess(false);
        toast.error(`Connect to ${appInfo.name} failed`);
        router.push('/apps');
      } else if (code && code != '') {
        // have code, start to connect
        connectApp({
          code: code,
          app: appInfo.key
        });
      }
    }
  }, [code, appInfo, connectError, connectApp]);

  return (
    <MaxWidthWrapper className='flex h-full flex-col gap-6'>
      {connecting ? (
        <div className='p-8'>
          {appInfo && <h1>Connecting to {appInfo.name}, Please wait a moment</h1>}
        </div>
      ) : (
        <>
          {success ? (
            <div className='p-8'>{appInfo && <h1>Connect to {appInfo.name} success</h1>}</div>
          ) : (
            <div className='p-8'>{appInfo && <h1>Connect to {appInfo.name} failed</h1>}</div>
          )}
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Page;
