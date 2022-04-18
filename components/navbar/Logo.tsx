import React from 'react';
import { Box, Text, useBreakpointValue as breakpoint } from '@chakra-ui/react';
import CustomLink from 'components/shared/CustomLink';

type LogoProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
const Logo = ({ onClick }: LogoProps) => (
  <CustomLink href='/' bare onClick={onClick}>
    <Text fontWeight={700} fontSize={24} fontFamily='Space Grotesk'>
      {breakpoint({ base: 'm', sm: 'mehdi' })}
      <Box as='span' color='#FD3559'>
        _
      </Box>
    </Text>
  </CustomLink>
);

export default Logo;
