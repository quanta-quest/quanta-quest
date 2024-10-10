'use client';

import React, { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Input,
  Listbox,
  ListboxItem
} from '@nextui-org/react';
import { Files, FileText, Search, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';
import ConnectedAppList from '@/components/dashboard/connected-apps-list';
import GmailSearchResult from '@/components/search/gmail/gmail-result';
import NotionSearchResult from '@/components/search/notion/notion-result';
import { type SearchResultDocument } from '@/schemas/knowledge-schemes';
import { useAppStore } from '@/store/app-store';

import DropboxSearchResult from '../search/dropbox-result';
import RaindropsSearchResult from '../search/raindrops-result';
import RowSteps from '../search/search-simple-steppers';
import HorizontalSteps from '../search/search-steppers';
import TetrisLoader from '../search/tetris-loader/tetris-loader';

interface SearchPhaseResult {
  phase: string;
  data: string;
  error: boolean;
  message: string;
}

const Dashboard = () => {
  const router = useRouter();
  const {
    query,
    querying,
    queryResult,
    aiResult,
    searchStep,
    setApps,
    setConnectedApps,
    setQuery,
    setQuerying,
    setQueryResult,
    setAiResult,
    setSearchStep,
    resetSearchStep
  } = useAppStore();

  const { data: allApps, isLoading: allAppsLoading } = trpc.apps.getAppSources.useQuery();

  const { data: connectedApps, isLoading: connectedAppsLoading } =
    trpc.apps.getConnectedApps.useQuery();

  const { mutate: search } = trpc.knowladge.searchWithAI.useMutation({
    onSuccess: (data) => {
      if (data) {
        setQueryResult(data.results as SearchResultDocument[]);
        setAiResult(data.aiResult);
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
    onMutate() {
      setQuerying(true);
      setShowAIResult(true);
    },
    onSettled() {
      setQuerying(false);
    }
  });

  useEffect(() => {
    if (allApps) {
      setApps(allApps);
    }
  }, [allApps, setApps]);

  useEffect(() => {
    if (connectedApps) {
      setConnectedApps(connectedApps);
    }
  }, [connectedApps, setConnectedApps]);

  // const startStream = () => {
  //   // setIsStreaming(true);
  //   console.log('startStream');
  //   return;
  // };

  const [showAIResult, setShowAIResult] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  // const [streaming, setStreaming] = useState(false);
  // trpc.knowladge.searchStream.useSubscription(
  //   { query: query },
  //   {
  //     enabled: streaming,
  //     onStarted: () => {
  //       setQuerying(true);
  //       setShowProgress(true);
  //       resetSearchStep();
  //       setSearchStep(1);
  //     },
  //     onData: (data) => {
  //       console.log(`${Date.now()} data: ${data}`);
  //       const phaseResult = JSON.parse(data) as SearchPhaseResult;

  //       if (phaseResult.error) {
  //         toast.error(phaseResult.message);
  //         return;
  //       }

  //       if (phaseResult.phase === 'prepare') {
  //       } else if (phaseResult.phase === 'searching') {
  //         // searching
  //         setSearchStep(2);
  //         setShowAIResult(true);
  //       } else if (phaseResult.phase === 'analyze') {
  //         setSearchStep(3);
  //         const list = JSON.parse(phaseResult.data) as SearchResultDocument[];
  //         setQueryResult(list);
  //       } else if (phaseResult.phase === 'magic') {
  //         setAiResult(phaseResult.data);
  //         setSearchStep(4);
  //         setStreaming(false);
  //         setQuerying(false);
  //       }
  //       // setMessages((prev) => [...prev, data]);
  //     },
  //     onError: (error) => {
  //       console.error('Subscription error:', error);
  //       setStreaming(false);
  //       setQuerying(false);
  //     }
  //   }
  // );

  const abortSearch = () => {
    setQueryResult([]);
    setAiResult('');
    resetSearchStep();
    // search({ query: query });
    setShowAIResult(false);
    setQuerying(false);

    // setStreaming(false);
    // setShowProgress(false);
  };
  // useEffect(() => {
  //   return () => {
  //     setStreaming(false);
  //   };
  // }, []);

  const searchKnowledge = () => {
    if (!query || query === '') {
      toast.error('Please ask your question with your data');
      return;
    }

    if (allAppsLoading || connectedAppsLoading) {
      toast.warning('Loading apps, please wait a moment');
      return;
    }

    if (!connectedApps || connectedApps.length === 0) {
      toast.error('Please Connet apps first');
      router.push('/apps');
      return;
    }

    // clear
    setQueryResult([]);
    setAiResult('');

    // setShowAIResult(false);
    // setStreaming(true);

    search({ query: query });
  };

  return (
    <>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-4 py-4 xl:py-8'>
          <h1 className='text-lg font-bold md:text-2xl xl:text-4xl'>Quanta Quest</h1>
          <p className='text-default-500'>Where AI Meets Your Personal Wiki</p>
        </div>
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <div className='flex w-full items-start justify-center gap-4'>
          <Input
            placeholder='Search'
            size='lg'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery('')}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchKnowledge();
              }
            }}
          />
          <Button
            color='primary'
            size='lg'
            onPress={() => {
              searchKnowledge();
            }}
            isLoading={querying}
          >
            {!querying && <Search />}
          </Button>
        </div>
        <ConnectedAppList />
      </div>
      {showProgress && (
        <div className='mt-0 flex w-full items-center justify-center md:mt-6'>
          <RowSteps
            currentStep={searchStep}
            defaultStep={0}
            steps={[
              {
                title: 'Prepare'
              },
              {
                title: 'Searching'
              },
              {
                title: 'Analyze'
              },
              {
                title: 'Magic'
              }
            ]}
          />
        </div>
      )}
      {showAIResult && (
        <Card className='my-4 w-full'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div className='flex items-center'>
              <Sparkles />
              <h2 className='ml-4 text-lg font-bold'>Answer</h2>
            </div>
            {/* <Button
              color='danger'
              size='sm'
              variant='flat'
              onPress={() => {
                abortSearch();
              }}
            >
              <X />
            </Button> */}
          </CardHeader>
          <CardBody className='flex w-full flex-row flex-wrap p-0 sm:flex-nowrap'>
            <div className='flex w-full px-4 py-5'>
              {/* <h2 className='text-large font-medium'>AI Search</h2> */}
              <div className='text-md flex w-full flex-col gap-3 pt-2'>
                {aiResult && aiResult != '' ? (
                  <p dangerouslySetInnerHTML={{ __html: aiResult.replaceAll('\n', '<br />') }}></p>
                ) : (
                  <div className='flex w-full items-center justify-center'>
                    <TetrisLoader />
                  </div>
                )}

                {/* <p className='w-full text-right'>AI Search is provided by Claude 3.5</p> */}
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      {queryResult && queryResult.length > 0 && (
        <div className='mt-10 flex flex-col gap-2'>
          <div className='flex w-full items-center border-b-1 py-2'>
            <Files />
            <h2 className='ml-4 text-lg font-bold'>Sources</h2>
          </div>
          <Listbox items={queryResult} aria-label='Dynamic Actions'>
            {(item) => {
              return (
                <ListboxItem
                  className='flex flex-col items-start justify-start p-6'
                  key={item.key}
                  color={'default'}
                  variant='flat'
                  onPress={() => {
                    if (item.url && item.url !== '') {
                      window.open(item.url, '_blank');
                    }
                    //empty link wiil not be jumped
                  }}
                >
                  {item.app_id === 1 && <NotionSearchResult item={item} />}
                  {item.app_id === 2 && <GmailSearchResult item={item} />}
                  {item.app_id === 3 && <DropboxSearchResult item={item} />}
                  {item.app_id === 4 && <RaindropsSearchResult item={item} />}
                </ListboxItem>
              );
            }}
          </Listbox>
        </div>
      )}
    </>
  );
};

export default Dashboard;
