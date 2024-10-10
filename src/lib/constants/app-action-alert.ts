export enum AppSourceActionAlert {
  DisconnectApp = 1,
  DeleteAppDocuments = 2,
  RemoveFromSearch = 3
}

export const appSourceActionAlertTitle = (alertType: AppSourceActionAlert) => {
  switch (alertType) {
    case AppSourceActionAlert.DisconnectApp: {
      return 'Disconnect App';
    }
    case AppSourceActionAlert.DeleteAppDocuments: {
      return 'Delete App Documents';
    }
    case AppSourceActionAlert.RemoveFromSearch: {
      return 'Remove From Search';
    }
    default: {
      return '';
    }
  }
};

export const appSourceActionAlertContent = (alertType: AppSourceActionAlert, appName: string) => {
  switch (alertType) {
    case AppSourceActionAlert.DisconnectApp: {
      return `You'r disconnecting with ${appName}. It could not sync data to knowledge base later. Do
      you confirm it?`;
    }
    case AppSourceActionAlert.DeleteAppDocuments: {
      return `You'r deleting ${appName}'s documents. It will compeletely delete all data. Do you confirm it?`;
    }
    case AppSourceActionAlert.RemoveFromSearch: {
      return `You'r removing ${appName}'s documents from search. It will never been searched in AI. Do you confirm it?`;
    }
    default: {
      return '';
    }
  }
};
