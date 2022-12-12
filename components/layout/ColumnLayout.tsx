import React, { FC, ReactNode } from 'react';

import { Box, Flex, useBreakpointValue as breakpoint } from '@chakra-ui/react';

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
        minW={
          keepOnMobile === 'aside'
            ? breakpoint({ base: '100%', md: 'xs' })
            : breakpoint({ base: 'xs' })
        }
        display={
          keepOnMobile === 'aside'
            ? breakpoint({ base: 'block' })
            : breakpoint({ base: 'none', lg: 'block' })
        }
      >
        {aside}
      </Box>
      <Box
        flex='1 1 0'
        overflowX='hidden'
        overflowY='scroll'
        display={
          keepOnMobile === 'main'
            ? breakpoint({ base: 'block' })
            : breakpoint({ base: 'none', sm: 'block' })
        }
      >
        {main}
      </Box>
    </Flex>
  );
};

export default ColumnLayout;
