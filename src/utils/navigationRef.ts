import * as React from 'react';
import type { NavigationContainerRef } from '@react-navigation/native';
import type { RefObject } from 'react';

export const navigationRef: RefObject<NavigationContainerRef> = React.createRef();

export function navigateUsingRef(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}
