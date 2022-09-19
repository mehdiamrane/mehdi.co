import React from 'react';
import Link from 'components/shared/Link';

import { Flex, Box, useBreakpointValue, useColorModeValue as mode } from '@chakra-ui/react';

type LogoProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
const Logo = ({ onClick }: LogoProps) => (
  <Link href='/' bare onClick={onClick}>
    <Flex
      color={mode('gray.900', 'white')}
      fontFamily='heading'
      fontSize='24px'
      fontWeight='semibold'
      className='logo'
    >
      <Box overflow='hidden' whiteSpace='nowrap' w='0' className='logo__text'>
        <span>{useBreakpointValue({ base: 'm', sm: 'mehdi' })}</span>
      </Box>
      <Box as='span' color='brand.500' className='logo__underscore'>
        _
      </Box>
    </Flex>
  </Link>
);

export default Logo;
