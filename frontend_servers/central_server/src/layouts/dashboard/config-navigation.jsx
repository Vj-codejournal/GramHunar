import SvgColor from 'src/components/svg-color';
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'student',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title:'your events', 
    path : 'event' , 
    icon : icon('ic_calendar'),
  },
  {
    title : 'pdf bot' , 
    path : '/pdf',
    icon : <FaFilePdf className='w-[25px] h-[25px]'/>,
  },
  {
    title:'video bot', 
    path : 'video' , 
    icon : <MdOutlineSlowMotionVideo className='w-[25px] h-[25px]'/>,
  },


];

export default navConfig;
