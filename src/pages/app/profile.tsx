import { UserProfile } from '@auth0/nextjs-auth0';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useContext } from 'react';

import NotLoggedSnackbar from '../../components/commons/NotLoggedSnackbar/NotLoggedSnackbar';
// eslint-disable-next-line camelcase
// import { unstable_getServerSession } from 'next-auth/next';
// import { signIn, signOut, useSession } from 'next-auth/react';
import PageSquare from '../../components/commons/PageSquare/PageSquare';
import { WebsitePageContext } from '../../components/wrappers/WebsitePage/context';
import websitePageHOC from '../../components/wrappers/WebsitePage/hoc/index';

const pageName = 'Perfil';

const PageProfile = () => {
  const websitePageContext = useContext(WebsitePageContext);
  const userLogged: UserProfile | undefined = websitePageContext?.userLogged;

  // const [stateloginSnackbar, setStateloginSnackbar] = useState<State>({
  //   open: !(!websitePageContext?.isUserLoginLoading && userLogged),
  //   vertical: 'bottom',
  //   horizontal: 'left',

  // const { data: session } = useSession();
  return (
    <>
      {websitePageContext?.userLogged && (
        <PageSquare>
          <Typography>{pageName}</Typography>
          <Divider variant="middle" style={{ margin: '5px 0' }} />
          <>
            <Typography variant="h4">Dados do usuário</Typography>
            <Box display="flex" flexDirection="column" alignItems="start">
              <Typography>{userLogged?.name}</Typography>
              <Typography>{userLogged?.nickname}</Typography>
              <Image
                src={userLogged?.picture || ''}
                alt={userLogged?.nickname || ''}
                width={100}
                height={100}
              />
            </Box>
          </>
        </PageSquare>
      )}
      <NotLoggedSnackbar />
    </>
  );
};

export default websitePageHOC(PageProfile, {
  pageWrapperProps: {
    seoProps: {
      headTitle: pageName,
    },
    footerProps: {
      content: 'Copyright AxeBlade Software',
    },
  },
});
