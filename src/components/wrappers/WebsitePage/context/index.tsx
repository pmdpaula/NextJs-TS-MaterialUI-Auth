// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useUser } from '@auth0/nextjs-auth0';
import { useTheme } from 'next-themes';
import { createContext, useMemo, useState } from 'react';

import { websitePageContextProps } from '../../../../../types/context.d';
import themeDark from '../../../../theme/themeDark';
// import { AuthProvider } from './AuthContext';
// import { websitePageContextProps } from '../context.d';

export const WebsitePageContext = createContext<websitePageContextProps | null>(
  null,
);

export const WrapperProvider = ({ children }: any) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(themeDark);
  // eslint-disable-next-line space-infix-ops, prettier/prettier, no-undef
  const [headTitle, setHeadTitle] = useState<string>('');
  const {
    user: userLogged,
    error: userError,
    isLoading: isUserLoginLoading,
  } = useUser(); // useUser from @auth0/nextjs-auth0

  // const [signIn, setSignIn] = useState(false);

  const providerValue = useMemo(
    () => ({
      resolvedTheme,
      currentTheme,
      setCurrentTheme,
      headTitle,
      setHeadTitle,
      userLogged,
      userError,
      isUserLoginLoading,
    }),
    [
      currentTheme,
      headTitle,
      resolvedTheme,
      userError,
      userLogged,
      isUserLoginLoading,
    ],
  );

  return (
    // <AuthProvider>
    <WebsitePageContext.Provider value={providerValue}>
      {children}
    </WebsitePageContext.Provider>
    // </AuthProvider>
  );
};
