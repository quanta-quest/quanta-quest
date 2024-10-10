import React, { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';

interface DocumentReloadCellButtonProperties {
  documentId: number;
  refetch: () => void | Promise<void>;
}

const DocumentReloadCellButton = ({ documentId }: DocumentReloadCellButtonProperties) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: reloadDocument } = trpc.documents.reloadDocument.useMutation({
    onSuccess: async ({ code, message }) => {
      if (code === 0) {
        // await refetch();
        toast.success('Start to reload the document, please wait. ');
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
        <Button color='default' variant='light' isIconOnly size='sm' isLoading={loading}>
          <RefreshCcw size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProperties) => (
          <div className='flex flex-col gap-2 px-1 py-1'>
            <h3 className='text-small font-bold' {...titleProperties}>
              Reload Document
            </h3>
            <div className='max-w-48 text-tiny'>
              Fetch data from application, and update knowledge base.
            </div>
            <div className='flex items-center justify-end gap-2'>
              <Button
                className='text-tiny'
                size='sm'
                color='primary'
                variant='solid'
                onPress={() => {
                  reloadDocument({ documentId });
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

export default DocumentReloadCellButton;
