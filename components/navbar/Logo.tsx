import React from 'react';
import { Box, Flex, Text, useBreakpointValue as breakpoint } from '@chakra-ui/react';
import CustomLink from 'components/shared/CustomLink';

type LogoProps = {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
const Logo = ({ onClick }: LogoProps) => (
  <CustomLink href='/' bare onClick={onClick}>
    <Flex className='logo' fontWeight={700} fontSize={24} fontFamily='Space Grotesk'>
      <Text className='logo__text'>{breakpoint({ base: 'm', sm: 'mehdi' })}</Text>
      <Text className='logo__underscore'>_</Text>
    </Flex>
  </CustomLink>
);

export default Logo;
