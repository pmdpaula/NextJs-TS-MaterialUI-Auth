import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useState } from 'react';

import FormSignIn from '../../components/patterns/FormSignIn/FormSignIn';
import FormSignUp from '../../components/patterns/FormSignUp/FormSignUp';
import websitePageHOC from '../../components/wrappers/WebsitePage/hoc/index';

const PageLogin = (): JSX.Element => {
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);

  const toggleSignMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <div className={clsx('container', isSignUpMode && 'sign-up-mode')}>
      <div className="forms-container">
        <div className="signin-signup">
          <FormSignIn />

          <FormSignUp setIsSignUpMode={setIsSignUpMode} />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <Typography variant="h3">Novo aqui?</Typography>
            <Typography variant="body1">Faça seu cadastro</Typography>
            <Button
              id="singUpButton"
              variant="outlined"
              style={{
                border: 'solid 3px white',
                color: 'white',
                borderRadius: 20,
                padding: '6px 30px',
              }}
              onClick={toggleSignMode}
            >
              Sign up
            </Button>
          </div>
          <img src="/images/signup.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <Typography variant="h3">Já é um de nós?</Typography>
            <Typography variant="body1">Faça o login</Typography>
            <Button
              id="singInButton"
              variant="outlined"
              style={{
                border: 'solid 3px white',
                color: 'white',
                borderRadius: 20,
                padding: '6px 30px',
              }}
              onClick={toggleSignMode}
            >
              Sign in
            </Button>
          </div>
          <img src="/images/login.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default websitePageHOC(PageLogin, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Login',
    },
  },
});
