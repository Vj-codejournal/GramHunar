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
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
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
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },

];

export default navConfig;
