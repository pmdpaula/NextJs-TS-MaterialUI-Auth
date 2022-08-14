/* eslint-disable no-unused-vars */
import { Error, UserProfile } from '@auth0/nextjs-auth0';
import { Theme } from '@mui/system';

export interface websitePageContextProps {
  resolvedTheme?: string;
  currentTheme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<Theme>>;
  headTitle: string;
  setHeadTitle: Dispatch<SetStateAction<Theme>>;
  userLogged: UserProfile | undefined;
  userError: Error | undefined;
  isUserLoginLoading: boolean;
}
