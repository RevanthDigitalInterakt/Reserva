import React, {
  createContext, ReactNode, useContext, useState,
} from 'react';

const CONTENTFUL_TESTING = true;

interface ContentfullContextProps {
  isTesting: boolean;
  toggleIsTesting: (value: boolean) => void
}

export const ContentfullContext = createContext<ContentfullContextProps>({
  isTesting: CONTENTFUL_TESTING,
  toggleIsTesting: () => { },
});

interface ContentfullContextProviderProps {
  children?: ReactNode;
}

function ContentfullContextProvider({ children }: ContentfullContextProviderProps) {
  const [isTesting, setIsTesting] = useState<boolean>(CONTENTFUL_TESTING);

  const toggleIsTesting = async (value: boolean) => {
    // setIsTesting(!isTesting);
  };

  return (
    <ContentfullContext.Provider value={{ isTesting, toggleIsTesting }}>
      {children}
    </ContentfullContext.Provider>
  );
}

export default ContentfullContextProvider;

export const useContentfull = () => {
  const contentfullContext = useContext(ContentfullContext);
  if (!contentfullContext) {
    throw new Error('use Auth must be used within a ContentfullContextProvider');
  }
  const {
    isTesting,
    toggleIsTesting,
  } = contentfullContext;
  return {
    isTesting,
    toggleIsTesting,
  };
};
