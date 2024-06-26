import { Helmet } from 'react-helmet-async';

import Events from '../sections/Events/event'

// ----------------------------------------------------------------------

export default function Event() {
  return (
    <>
      <Helmet>
        <title> Event | Minimal UI </title>
      </Helmet>

      <Events />
    </>
  );
}
