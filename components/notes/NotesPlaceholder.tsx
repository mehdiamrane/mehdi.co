import React from 'react';
import { Box, Flex, Icon, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { RiFile2Line } from 'react-icons/ri';
import { useTranslation } from 'next-i18next';

const NotesPlaceholder = () => {
  const { t } = useTranslation('notes');
  return (
    <Box
      as='main'
      m='0 auto'
      px={6}
      w='full'
      pb={{ base: 12, md: 16 }}
      pt={{ base: 24, md: 32 }}
      maxW='xl'
    >
      <Flex
        align='center'
        justify='center'
        flexDir='column'
        bg={mode('gray.100', 'dark.700')}
        border='2px solid'
        borderColor={mode('gray.300', 'dark.900')}
        p={8}
        rounded='lg'
      >
        <Icon color={mode('gray.400', 'gray.600')} as={RiFile2Line} w={12} h={12} />
        <Box color={mode('gray.500', 'gray.500')} fontWeight={400} textAlign='center' pt={4}>
          <Text fontSize='lg' mb={1}>
            {t('notes.placeholder.title')}
          </Text>
          <Text>{t('notes.placeholder.description')}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default NotesPlaceholder;
