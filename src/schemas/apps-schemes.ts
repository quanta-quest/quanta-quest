export interface AppDataSource extends AppInfo {
  oauthUrl: string;
}

export interface AppInfo {
  id: number;
  name: string;
  key: string;
  desc: string;
  website: string;
  status: number;
}

export interface UserAppDataSource {
  id: number;
  user_id: number;
  appId: number;
  connectedAt: number;
  status: number;
  remark: string;
  syncStatus: number;
  lastSyncAt: number;
}
