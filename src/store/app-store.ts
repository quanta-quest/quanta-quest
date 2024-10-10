import type { AppInfo, UserAppDataSource } from '@/schemas/apps-schemes';

import { KindeUserBase } from '@kinde-oss/kinde-auth-nextjs/types';
import { user as User } from '@prisma/client';
import { create } from 'zustand';

import { trpc } from '@/app/_trpc/client';
import { type SearchResultDocument } from '@/schemas/knowledge-schemes';

interface AppStoreState {
  // dashboard
  query: string;
  querying: boolean;
  queryResult: SearchResultDocument[];

  aiResult: string;

  searchStep: number;

  //apps
  apps: AppInfo[];
  connectedApps: UserAppDataSource[];

  // user info
  // kindeUser?: KindeUserBase;
  // user?: User;
  // userLoading: boolean;
}

interface AppStoreAction {
  setApps: (appList: AppInfo[]) => void;
  setQuerying: (isQuery: boolean) => void;
  setQuery: (keyword: string) => void;
  setQueryResult: (result: SearchResultDocument[]) => void;
  setAiResult: (result: string) => void;
  setConnectedApps: (apps: UserAppDataSource[]) => void;
  addSearchStep: () => void;
  setSearchStep: (step: number) => void;
  resetSearchStep: () => void;
  // login: (kindeUser: KindeUserBase) => void;
}

export const useAppStore = create<AppStoreState & AppStoreAction>((set, get) => ({
  query: '',
  querying: false,
  queryResult: [],
  aiResult: '',
  apps: [],
  connectedApps: [],
  searchStep: 0,
  // kindeUser: undefined,
  // user: undefined,
  // userLoading: true
  setApps: (appList) => {
    set((state) => ({ ...state, apps: appList }));
  },
  setConnectedApps: (apps) => {
    set((state) => ({ ...state, connectedApps: apps }));
  },
  setQuerying: (isQuery) => {
    set((state) => ({ ...state, querying: isQuery }));
  },
  setQueryResult: (result) => {
    set((state) => ({ ...state, queryResult: result }));
  },
  addSearchStep: () => {
    set((state) => ({ ...state, searchStep: state.searchStep + 1 }));
  },
  setSearchStep: (step) => {
    set((state) => ({ ...state, searchStep: step }));
  },
  resetSearchStep: () => {
    set((state) => ({ ...state, searchStep: 0 }));
  },
  // eslint-disable-next-line sonarjs/cognitive-complexity
  setAiResult: (result) => {
    //handle ai result for resource
    let aiResult = result;
    const results = get().queryResult;
    if (results.length > 0) {
      const regex = /\[\d+]/g;
      const matches = aiResult.match(regex);
      if (matches) {
        const uniqueMatches = [...new Set(matches)];
        for (const match of uniqueMatches) {
          const index = Number.parseInt(match.replace('[', '').replace(']', ''));
          if (index > results.length) {
            continue;
          }
          const result_ = results[index - 1];
          if (result_) {
            if (!result_.url || result_.url === '') {
              // empty link will not be connect
              continue;
            }
            aiResult = aiResult.replaceAll(
              match,
              `<a class="bg-slate-200 dark:bg-slate-600 rounded-lg text-sm px-1" target="_blank" href="${result_.url}">[${index}]</a>`
            );
          }
        }
      }
    }
    set((state) => ({ ...state, aiResult: aiResult }));
  },
  setQuery: (keyword) => {
    set((state) => ({ ...state, query: keyword }));
  }
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears })
}));
