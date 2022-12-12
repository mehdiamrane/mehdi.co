import React, { FC, ReactNode } from 'react';

import { Box, Flex } from '@chakra-ui/react';

interface IColumnLayoutProps {
  main: ReactNode;
  aside: ReactNode;
  keepOnMobile: 'main' | 'aside';
}

const ColumnLayout: FC<IColumnLayoutProps> = ({ main, aside, keepOnMobile }) => {
  return (
    <Flex align='stretch' h='100vh' overflow='hidden'>
      <Box
        flex='0 0 0'
        pt={16}
        h='100vh'
        className={`column-layout__aside${keepOnMobile === 'aside' ? '--keep-mobile' : ''}`}
      >
        {aside}
      </Box>
      <Box
        flex='1 1 0'
        overflowX='hidden'
        overflowY='scroll'
        className={`column-layout__main${keepOnMobile === 'main' ? '--keep-mobile' : ''}`}
      >
        {main}
      </Box>
    </Flex>
  );
};

export default ColumnLayout;
