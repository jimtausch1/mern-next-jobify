import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoBarChartSharp } from 'react-icons/io5';
import { MdAdminPanelSettings, MdQueryStats } from 'react-icons/md';

export const links = [
  {
    text: 'all jobs',
    path: '.',
    icon: <MdQueryStats />,
  },
  {
    text: 'add job',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoBarChartSharp />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    text: 'admin',
    path: 'admin',
    icon: <MdAdminPanelSettings />,
  },
];
