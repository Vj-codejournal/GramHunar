import { Helmet } from 'react-helmet-async';

import  StudentInfo  from 'src/sections/student_info/StudentInfo';

// ----------------------------------------------------------------------

export default function Info() {
  return (
    <>
      <Helmet>
        <title> student info | Minimal UI </title>
      </Helmet>

      <StudentInfo />
    </>
  );
}
