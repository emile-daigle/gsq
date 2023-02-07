import React from 'react';
import Router from 'next/router';

interface Props {
  [key: string]: any;
}

const withAuth = (Component: React.ComponentType) => {
  const WithAuth: React.FC = (props) => {
    if (!sessionStorage.getItem("jwtToken")) {
      Router.push('/login');
      return null;
    }

    return (
      <>
        {/* Layout Component */}
        <header>Header</header>
        <main>
          <Component {...props} />
        </main>
        <footer>Footer</footer>
      </>
    );
  };

  return WithAuth;
};

export default withAuth;
