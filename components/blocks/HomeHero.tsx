import React from 'react';
import { IoArrowForwardSharp } from 'react-icons/io5';
import Link from 'components/shared/Link';
import Avatar from './Avatar';
import useTranslation from 'hooks/useTranslation';
import { Trans } from 'next-i18next';

import { Flex, Box, Heading, Button, Text } from '@chakra-ui/react';
import { containerProps } from 'styles/theme';

const HomeHero = () => {
  const { t } = useTranslation('home');

  return (
    <Flex
      align='flex-start'
      gap={8}
      direction={{ base: 'column-reverse', md: 'row' }}
      justify={{ base: 'normal', md: 'space-between' }}
      py={{ base: 16, md: 20 }}
      {...containerProps}
    >
      <Box flexBasis='70%'>
        <Heading as='h1' variant='gradient'>
          {t('hero.title')}
        </Heading>
        <Heading
          as='h2'
          color='gray.800'
          fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
          fontFamily='body'
          fontWeight='normal'
        >
          {t('hero.subtitle')}
        </Heading>

        <Text
          color='gray.900'
          fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
          mt={4}
          lineHeight='tall'
          fontWeight='medium'
        >
          <Trans
            i18nKey='hero.body'
            t={t}
            components={[
              <Link href='/projects' bare key={0} />,
              <Link href='/blog' bare key={1} />,
              <Link href='/notes' bare key={2} />,
            ]}
          />
        </Text>

        <Flex wrap='wrap' gap={4} mt={6}>
          <Link href='/projects' bare>
            <Button
              variant='glow'
              rightIcon={<IoArrowForwardSharp />}
              size={{ base: 'sm', sm: 'md' }}
            >
              {t('hero.primary_cta')}
            </Button>
          </Link>
          <Link href='/about' bare>
            <Button variant='secondary' size={{ base: 'sm', sm: 'md' }}>
              {t('hero.secondary_cta')}
            </Button>
          </Link>
        </Flex>
      </Box>

      <Box maxW={{ base: 40, md: 'full' }} flexBasis={{ base: 'auto', md: '25%' }}>
        <Avatar />
      </Box>
    </Flex>
  );
};

export default HomeHero;
