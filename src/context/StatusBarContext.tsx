import React, {
  useState, createContext, ReactNode, useContext,
} from 'react';
import { Platform } from 'react-native';
import { platformType } from '../utils/platformType';

export enum StatusBarStyle {
  DARK_CONTENT = 'dark-content',
  LIGHT_CONTENT = 'light-content',
}

interface StatusBarContextProps {
  backgroundColor: string;
  barStyle: StatusBarStyle;
  changeBackgroundColor: (color: string) => void;
  changeBarStyle: (style: StatusBarStyle) => void;
}

export const StatusBarContext = createContext<StatusBarContextProps>({
  backgroundColor: '#61dafb',
  barStyle:
    Platform.OS === platformType.IOS
      ? StatusBarStyle.DARK_CONTENT
      : StatusBarStyle.LIGHT_CONTENT,
  changeBackgroundColor: (color: string) => {},
  changeBarStyle: (style: StatusBarStyle) => {},
});

interface StatusBarContextProviderProps {
  children?: ReactNode;
}

function StatusBarContextProvider({
  children,
}: StatusBarContextProviderProps) {
  const [backgroundColor, setBackgroundColor] = useState('#61dafb');
  const [barStyle, setBarStyle] = useState(
    Platform.OS === platformType.IOS
      ? StatusBarStyle.DARK_CONTENT
      : StatusBarStyle.LIGHT_CONTENT,
  );

  const changeBackgroundColor = (color: string) => {
    setBackgroundColor(color);
  };

  const changeBarStyle = (style: StatusBarStyle) => {
    setBarStyle(style);
  };

  return (
    <StatusBarContext.Provider
      value={{
        backgroundColor,
        changeBackgroundColor,
        barStyle,
        changeBarStyle,
      }}
    >
      {children}
    </StatusBarContext.Provider>
  );
}

export default StatusBarContextProvider;

export const useStatusBar = () => {
  const statusBarContext = useContext(StatusBarContext);
  if (!statusBarContext) {
    throw new Error('use StatusBar must be used within a StatusBarContext');
  }
  const {
    backgroundColor, changeBackgroundColor, barStyle, changeBarStyle,
  } = statusBarContext;
  return {
    backgroundColor,
    changeBackgroundColor,
    barStyle,
    changeBarStyle,
  };
};
