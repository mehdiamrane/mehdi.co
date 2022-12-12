import React, { FC } from 'react';

import { Box, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react';
import SidebarItem from './SidebarItem';
import { useTranslation } from 'next-i18next';

interface ISidebarProps {
  notes: Note[];
}

const Sidebar: FC<ISidebarProps> = ({ notes }) => {
  const { t } = useTranslation('notes');

  return (
    <Box
      w='full'
      minW={72}
      h='full'
      bg={mode('gray.50', 'dark.800')}
      borderRight='1px solid'
      borderColor={mode('gray.200', 'dark.200')}
    >
      <Flex
        align='center'
        justify='flex-start'
        h='54px'
        px={4}
        borderBottom='1px solid'
        borderColor={mode('gray.300', 'dark.200')}
      >
        <Text fontSize='sm'>{t('notes.count', { count: notes.length })}</Text>
      </Flex>
      <Box overflowY='scroll' h='calc(100% - 54px)' overflowX='hidden'>
        {notes.map((note) => (
          <SidebarItem key={note.slug} note={note} />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
