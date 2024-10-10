import React, { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';

interface DocumentDeleteCellButtonProperties {
  documentId: number;
  refetch: () => void | Promise<void>;
}

const DocumentDeleteCellButton = ({ documentId, refetch }: DocumentDeleteCellButtonProperties) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate: deleteDocuemnt } = trpc.documents.deleteDocument.useMutation({
    onSuccess: async ({ code, message }) => {
      if (code === 0) {
        toast.success('Start to delete the document, please wait. ');
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
          <Trash2 size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProperties) => (
          <div className='flex flex-col gap-2 px-1 py-1'>
            <h3 className='text-small font-bold text-danger-400' {...titleProperties}>
              Delete Document
            </h3>
            <div className='max-w-48 text-tiny'>
              Delete all data of document, and remove the record.
            </div>
            <div className='flex items-center justify-end gap-2'>
              <Button
                className='text-tiny'
                size='sm'
                color='danger'
                variant='solid'
                onPress={() => {
                  deleteDocuemnt({ documentId: documentId });
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

export default DocumentDeleteCellButton;
