import { useCallback, useEffect, useState } from "react";
import CodePush from 'react-native-code-push';

export default () => {
  const [syncMessage, setSyncMessage] = useState('');
  const [progress, setProgress] = useState(true);

  const codePushStatusDidChange = useCallback(
    syncStatus => {
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          setSyncMessage('Checking for update');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          setSyncMessage('Downloading package');
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          setSyncMessage('Awaiting user action');
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          setSyncMessage('Installing update');
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          setSyncMessage('App up to date.');
          setProgress(false);
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          setSyncMessage('Update cancelled by user.');
          setProgress(false);
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          setSyncMessage('Update installed and will be applied on restart.');
          setProgress(false);
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          setSyncMessage('An unknown error occurred.');
          setProgress(false);
          break;
      }
    },
    [setSyncMessage]
  )

  const downloadProgressCallback = useCallback(progress => {
    setProgress(progress);
    console.log('[codepush] progress', progress);
  }, []);

  const checkExtraCodepush = useCallback(async () => {
    const meta = await CodePush.getUpdateMetadata();
    console.log('[codepush] meta', meta);
  }, []);

  useEffect(() => {
    CodePush.notifyAppReady();
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
        updateDialog: {
          title: 'An OTA update is available',
          description: 'Would you like to install it?',
        },
        rollbackRetryOptions: {
          delayInHours: 0.1,
          maxRetryAttempts: 1,
        },
      },
      codePushStatusDidChange,
      downloadProgressCallback,
    );

    checkExtraCodepush();
  }, [checkExtraCodepush, codePushStatusDidChange, downloadProgressCallback]);

}