import { Helmet } from 'react-helmet-async';

import  View  from 'src/sections/pdfchat/view';
import PSRC from 'src/sections/pdfchat/PdfSrc';
// ----------------------------------------------------------------------

export default function PdfPage() {
  return (
    <>
      <Helmet>
        <title> Blog | Minimal UI </title>
      </Helmet>

      <PSRC> 
      <View />
      </PSRC>
    </>
  );
}