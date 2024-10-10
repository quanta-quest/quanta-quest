'use client';

import React, { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Chip,
  divider,
  Input,
  Link,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { inferProcedureOutput } from '@trpc/server';
import {
  DatabaseBackup,
  DeleteIcon,
  EditIcon,
  Eraser,
  EyeIcon,
  MessageSquareOff,
  RefreshCcw,
  Search,
  SearchX,
  Trash,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

import { trpc } from '@/app/_trpc/client';
import { cn } from '@/lib/utils';
import { AppRouter } from '@/trpc/routers/_app';

import DocumentDeleteCellButton from './document-delete-cell-button';
import DocumentReloadCellButton from './document-reload-cell-button';
import DocumentRemoveFromSearchCellButton from './document-remove-from-search-cell-button';

interface AppDocumentTableProperty {
  appId: number;
}

const ITEMS_PER_PAGE = 10;

const getStatusColor = (status: number) => {
  switch (status) {
    case 0: {
      return 'default';
    }
    case 1: {
      return 'success';
    }
    case 2: {
      return 'primary';
    }
    case 3: {
      return 'warning';
    }
    case 4: {
      return 'danger';
    }
    case 5: {
      return 'danger';
    }
    default: {
      return 'default';
    }
  }
};
const getStatusName = (status: number) => {
  switch (status) {
    case 0: {
      return 'INIT';
    }
    case 1: {
      return 'ACTIVE';
    }
    case 2: {
      return 'PROCESSING';
    }
    case 3: {
      return 'REMOVED';
    }
    case 4: {
      return 'FAILED';
    }
    case 5: {
      return 'INVALID';
    }
    default: {
      return 'UNKNOWN';
    }
  }
};

type GetDocumentsOutput = inferProcedureOutput<AppRouter['documents']['getDocuments']>;

const AppDocumentTable = ({ appId }: AppDocumentTableProperty) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set<string>());

  const rowsPerPage = ITEMS_PER_PAGE;
  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setCurrentPage(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  const { data, isLoading, refetch } = trpc.documents.getDocuments.useQuery({
    appId: appId,
    page: currentPage,
    limit: rowsPerPage,
    keyword: debouncedKeyword
  });

  type Document = GetDocumentsOutput['results'][number];

  const pages = React.useMemo(() => {
    return data?.total ? Math.ceil(data.total / rowsPerPage) : 0;
  }, [data?.total, rowsPerPage]);

  const loadingState = isLoading ? 'loading' : 'idle';

  const columns = [
    {
      uid: 'title',
      name: 'Title'
    },
    {
      uid: 'document_type',
      name: 'Type'
    },
    {
      uid: 'app_pharase_count',
      name: 'Pharase Count'
    },
    {
      uid: 'status',
      name: 'Status'
    },
    {
      uid: 'indexed_at',
      name: 'Indexed At'
    },
    {
      uid: 'actions',
      name: 'Actions'
    }
  ];

  const renderCell = React.useCallback((document: Document, columnKey: string) => {
    switch (columnKey) {
      case 'title': {
        return (
          <Link href={document.url} target='_blank'>
            {document.title}
          </Link>
        );
      }
      case 'document_type': {
        return <p>{document.document_type}</p>;
      }
      case 'status': {
        return (
          <Chip
            className='capitalize'
            color={getStatusColor(document.status)}
            size='sm'
            variant='flat'
          >
            {getStatusName(document.status)}
          </Chip>
        );
      }
      case 'app_pharase_count': {
        return <p>{document.app_pharase_count}</p>;
      }
      case 'indexed_at': {
        return document.indexed_at ? (
          <p>{new Date(document.indexed_at).toLocaleDateString()}</p>
        ) : (
          <p>-</p>
        );
      }
      case 'actions': {
        return (
          <div className='relative flex items-center gap-2'>
            {/* sync document */}
            <DocumentReloadCellButton documentId={document.id} refetch={refreshData} />
            {/* close document  */}
            <DocumentRemoveFromSearchCellButton documentId={document.id} refetch={refreshData} />
            {/* delete document */}
            <DocumentDeleteCellButton documentId={document.id} refetch={refreshData} />
          </div>
        );
      }
      //   default: {
      //     return (document as any)[columnKey]?.toString();
      //   }
    }
  }, []);

  const refreshData = async () => {
    await refetch();
  };

  const isSelected = useMemo(() => {
    return (selectedKeys instanceof Set && selectedKeys.size > 0) || selectedKeys === 'all';
  }, [selectedKeys]);

  return (
    <div>
      <Table
        selectionMode='single'
        // selectedKeys={selectedKeys}
        // onSelectionChange={setSelectedKeys}
        selectionBehavior={'toggle'}
        aria-label='Example table with client async pagination'
        topContent={
          <div className='flex w-full justify-start'>
            <Input
              value={keyword}
              onValueChange={setKeyword}
              startContent={<Search />}
              placeholder='Search'
              size='sm'
              className='w-64'
            ></Input>
          </div>
        }
        bottomContent={
          <div
            className={cn('flex w-full justify-center', {
              'justify-between': isSelected
            })}
          >
            {isSelected && (
              <div className='flex'>
                <Button>delete</Button>
              </div>
            )}
            {pages > 0 ? (
              <Pagination
                isCompact
                showControls
                showShadow
                color='primary'
                page={currentPage}
                total={pages}
                onChange={async (page) => {
                  console.log(page);
                  setCurrentPage(page);
                }}
              />
            ) : undefined}
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.results ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
          emptyContent={'No Records to display.'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppDocumentTable;
