import React from 'react';
import { IoDocument } from 'react-icons/io5';
import { MdOutlineWork } from 'react-icons/md';
import { RiMessage2Fill } from 'react-icons/ri';
import Link from 'components/shared/Link';
import Avatar from './Avatar';
import useTranslation from 'hooks/useTranslation';
import { Trans } from 'next-i18next';

import { Flex, Box, Heading, Button, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { containerProps } from 'styles/theme';

const HomeHero = () => {
  const { t } = useTranslation('home');

  return (
    <Flex
      align='flex-start'
      gap={8}
      direction={{ base: 'column-reverse', md: 'row' }}
      justify={{ base: 'normal', md: 'space-between' }}
      pt={{ base: 24, md: 32 }}
      pb={{ base: 16, md: 20 }}
      {...containerProps}
    >
      <Box flexBasis='70%'>
        <Heading as='h1' variant='gradient'>
          {t('hero.title')}
        </Heading>
        <Heading
          as='h2'
          color={mode('gray.800', 'whiteAlpha.800')}
          fontSize={{ base: 'md', md: 'lg' }}
          fontFamily='body'
          fontWeight='normal'
        >
          {t('hero.subtitle')}
        </Heading>

        <Text
          color={mode('gray.900', 'whiteAlpha.900')}
          fontSize={{ base: 'md', md: 'lg' }}
          mt={4}
          lineHeight='tall'
          fontWeight='medium'
        >
          <Trans i18nKey='hero.body' t={t} />
        </Text>

        <Flex wrap='wrap' gap={2} mt={6}>
          <Link href='/cv' bare>
            <Button variant='glow' leftIcon={<IoDocument />} size='sm'>
              {t('hero.buttons.resume')}
            </Button>
          </Link>
          <Link href='/#work' bare>
            <Button variant='secondary' leftIcon={<MdOutlineWork />} size='sm'>
              {t('hero.buttons.work')}
            </Button>
          </Link>
          <Link href='/#contact' bare>
            <Button variant='secondary' leftIcon={<RiMessage2Fill />} size='sm'>
              {t('hero.buttons.contact')}
            </Button>
          </Link>
        </Flex>
      </Box>

      <Box w='full' maxW={{ base: 40, md: 'full' }} flexBasis={{ base: 'auto', md: '25%' }}>
        <Avatar />
      </Box>
    </Flex>
  );
};

export default HomeHero;
