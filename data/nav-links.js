import { RiToolsFill, RiUserSmileFill, RiFileCodeFill, RiPencilFill } from 'react-icons/ri';

const links = [
  {
    key: 'about',
    href: '/about',
    icon: RiUserSmileFill,
  },
  {
    key: 'blog',
    href: '/blog',
    icon: RiPencilFill,
  },
  {
    key: 'projects',
    href: '/projects',
    icon: RiToolsFill,
  },
  {
    key: 'snippets',
    href: '/snippets',
    icon: RiFileCodeFill,
  },
];

export default links;
