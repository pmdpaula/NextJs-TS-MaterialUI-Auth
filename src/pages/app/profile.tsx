import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import PageSquare from '../../components/commons/PageSquare/PageSquare';
import websitePageHOC from '../../components/wrappers/WebsitePage/hoc/index';

const pageName = 'Perfil';

const PageProfile = () => (
  <PageSquare>
    <Typography>{pageName}</Typography>
    <Typography variant="h4">Dados do usuário</Typography>
    <Divider variant="middle" style={{ margin: '5px 0' }} />
    {/* {session ? ( */}
    <Box display="flex" flexDirection="column" alignItems="start">
      quadro
    </Box>
    <Box display="flex" flexDirection="column" alignItems="center">
      Você não está logado
      <Button variant="contained" color="primary" href="/app/login">
        Conectar
      </Button>
    </Box>
  </PageSquare>
);

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
