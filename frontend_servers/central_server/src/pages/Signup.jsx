import { Helmet } from 'react-helmet-async';

import SignView  from 'src/sections/login/Signup' ; 

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <SignView />
    </>
  );
}
