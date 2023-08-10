import React from 'react';
import Config from 'react-native-config';
import { DatadogProvider } from '@datadog/mobile-react-native';
import datadogConfig from '../../config/datadogConfig';

interface IDatadogComponentProvider {
  children: JSX.Element;
}

function DatadogComponentProvider({ children }: IDatadogComponentProvider) {
  if (Config.DATADOG_CLIENT_TOKEN && !__DEV__) {
    return (
      <DatadogProvider configuration={datadogConfig}>
        {children}
      </DatadogProvider>
    );
  }

  return children;
}

export default DatadogComponentProvider;
