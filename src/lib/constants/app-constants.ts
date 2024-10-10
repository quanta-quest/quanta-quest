import { type AppInfo } from '@/schemas/apps-schemes';

export const APP_DATA_SOURCE_CONSTANTS = {
  notion: 1,
  gmail: 2,
  dropbox: 3,
  raindrops: 4
};

const APP_INFO_LIST: AppInfo[] = [
  {
    id: APP_DATA_SOURCE_CONSTANTS.notion,
    name: 'Notion',
    key: 'notion',
    desc: 'With Notion, you can import workspaces, pages, databases, and more.',
    status: 1,
    website: 'https://notion.so'
  },
  {
    id: APP_DATA_SOURCE_CONSTANTS.gmail,
    name: 'Gmail',
    key: 'gmail',
    desc: 'With Gmail, you can import mails and more.',
    status: 1,
    website: 'https://gmail.com'
  },
  {
    id: APP_DATA_SOURCE_CONSTANTS.dropbox,
    name: 'Dropbox',
    key: 'dropbox',
    desc: 'With Dropbox, you can import files and more.',
    status: 1,
    website: 'https://dropbox.com'
  },
  {
    id: APP_DATA_SOURCE_CONSTANTS.raindrops,
    name: 'Raindrops',
    key: 'raindrops',
    desc: 'With Raindrops, you can import sites you liked.',
    status: 1,
    website: 'https://raindrop.io'
  }
];

export function getAppInfos() {
  return APP_INFO_LIST;
}

export function getAppSyncStatus(status: number) {
  switch (status) {
    case 0: {
      return 'Pendding';
    }
    case 1: {
      return 'Syncing';
    }
    case 2: {
      return 'Synced';
    }
    case 3: {
      return 'Sync Failed';
    }
    case 4: {
      return 'Deleting';
    }
    case 5: {
      return 'Deleted';
    }
    case 6: {
      return 'Removing';
    }
    case 7: {
      return 'Removed';
    }
    default: {
      return 'Unknown';
    }
  }
}
