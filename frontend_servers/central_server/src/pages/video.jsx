import { Helmet } from 'react-helmet-async';

import VV from 'src/sections/video/video-view';
import VSRC from '../sections/video/VideoSrc'

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      <VSRC>
      <VV/>
      </VSRC>
    </>
  );
}
