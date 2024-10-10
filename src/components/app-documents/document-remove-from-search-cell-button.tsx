import React, { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { RefreshCcw, SearchX } from 'lucide-react';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';

interface DocumentRemoveFromSearchCellButtonProperties {
  documentId: number;
  refetch: () => void | Promise<void>;
}

const DocumentRemoveFromSearchCellButton = ({
  documentId,
  refetch
}: DocumentRemoveFromSearchCellButtonProperties) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: removeFromSearch } = trpc.documents.removeFromSearch.useMutation({
    onSuccess: async ({ code, message }) => {
      if (code === 0) {
        // await refetch();
        setIsOpen(false);
        toast.success('Start to remove the document from search, please wait. ');
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

  return (
    <Popover showArrow placement='bottom' isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <Button color='danger' variant='light' size='sm' isIconOnly isLoading={loading}>
          <SearchX size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProperties) => (
          <div className='flex flex-col gap-2 px-1 py-1'>
            <h3 className='text-small font-bold text-danger-400' {...titleProperties}>
              Remove from Search
            </h3>
            <div className='flex max-w-48 flex-col gap-1 text-tiny'>
              <p>
                Remove all data of documents from search but keep the record. When syncing app, it
                will not be synced.
              </p>
              <p>It will NOT be searched by AI.</p>
            </div>
            <div className='flex items-center justify-end gap-2'>
              <Button
                className='text-tiny'
                size='sm'
                color='danger'
                variant='solid'
                onPress={() => {
                  removeFromSearch({ documentId });
                  if (isOpen) {
                    setIsOpen(false);
                  }
                }}
              >
                confirm
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DocumentRemoveFromSearchCellButton;
