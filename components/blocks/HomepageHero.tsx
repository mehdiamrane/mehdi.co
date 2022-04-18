import React from 'react';
import { Box, Button, Wrap, Heading, Stack, useBreakpointValue as breakpoint, useColorModeValue as mode } from '@chakra-ui/react';
import { IoArrowForwardSharp } from 'react-icons/io5';
import CustomLink from 'components/shared/CustomLink';

import { MotionText, MotionBox } from 'components/motion';
import { fadeInUp } from 'styles/animations';
import AvatarGrid from './AvatarGrid';

import useTranslation from 'hooks/useTranslation';
import { Trans } from 'next-i18next';

const HomepageHero = () => {
  const { t } = useTranslation('home');

  const jobTitle = breakpoint({
    base: t('hero.subtitle_short'),
    lg: t('hero.subtitle'),
  });

  return (
    <Stack w='full' direction={{ base: 'column-reverse', md: 'row' }} align='center' spacing={0}>
      <Box flexBasis='60%'>
        <Heading variant='gradient' as='h1' size='title'>
          {t('hero.title')} <br />
          {jobTitle}
        </Heading>
        <MotionText
          variants={fadeInUp}
          mt={4}
          fontSize={{
            base: 'sm',
            sm: 'md',
            md: 'lg',
            lg: 'xl',
          }}
          fontWeight={600}
          lineHeight='tall'
        >
          <Trans
            i18nKey='hero.body'
            t={t}
            components={[
              <CustomLink href='/projects' bare key={0} />,
              <CustomLink href='/blog' bare key={1} />,
              <CustomLink href='/notes' bare key={2} />,
            ]}
          />
        </MotionText>
        <Wrap spacing={{ base: 2, md: 4 }} mt={6}>
          <MotionBox variants={fadeInUp}>
            <CustomLink href='/projects' bare>
              <Button as='div' size={breakpoint({ base: 'sm', sm: 'md', md: 'lg' })} variant='glow' rightIcon={<IoArrowForwardSharp />}>
                {t('hero.view_projects')}
              </Button>
            </CustomLink>
          </MotionBox>
          <MotionBox variants={fadeInUp}>
            <CustomLink href='/about' bare>
              <Button as='div' size={breakpoint({ base: 'sm', sm: 'md', md: 'lg' })} colorScheme={mode('dark', 'gray')} variant='solid'>
                {t('hero.about_me')}
              </Button>
            </CustomLink>
          </MotionBox>
        </Wrap>
      </Box>
      <Box w='full' flexBasis='40%'>
        <AvatarGrid />
      </Box>
    </Stack>
  );
};

export default HomepageHero;
