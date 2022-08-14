import router from 'next/router';
import { useContext } from 'react';

import { WebsitePageContext } from '../context';

const WrapperAuth = (PageComponent: any) => {
  const AuthRoute = () => {
    const websitePageContext = useContext(WebsitePageContext);

    const isAuth = !!websitePageContext?.userLogged;
    if (isAuth) {
      return <PageComponent />;
    }
    return () => {
      router.push('/api/auth/login');
    };
  };

  return AuthRoute;
};

export default WrapperAuth;
