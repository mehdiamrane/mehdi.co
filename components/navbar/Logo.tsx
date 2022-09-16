import React from 'react';
import Link from 'components/shared/Link';

import { Flex, Box } from '@chakra-ui/react';

type LogoProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
const Logo = ({ onClick }: LogoProps) => (
  <Link href='/' bare onClick={onClick}>
    <Flex
      color='gray.900'
      fontFamily='heading'
      fontSize='24px'
      fontWeight='semibold'
      className='logo'
    >
      <Box overflow='hidden' whiteSpace='nowrap' w='0' className='logo__text'>
        <span>mehdi</span>
      </Box>
      <Box as='span' color='brand.500' className='logo__underscore'>
        _
      </Box>
    </Flex>
  </Link>
);

export default Logo;
