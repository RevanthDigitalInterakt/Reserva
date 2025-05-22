import type React from 'react';

export type Flow = {
  component: React.ComponentType<any>;
  name: string;
  initialParams?: object;
};
