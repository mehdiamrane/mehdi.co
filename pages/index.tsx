import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import HomeHero from 'components/blocks/HomeHero';
import SectionTitle from 'components/blocks/SectionTitle';
import TechGrid from 'components/blocks/TechGrid';
import techs from 'data/techs';
import WorkItem from 'components/blocks/WorkItem';

import useTranslation from 'hooks/useTranslation';
import {
  Flex,
  Box,
  Text,
  Button,
  IconButton,
  Divider,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import theme, { containerProps } from 'styles/theme';

import { FaLinkedin, FaGithub } from 'react-icons/fa';

const HomePage: NextPage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name='description' content={t('hero.body')} />
      </Head>

      <Box w='full' as='main' pb={20}>
        <Box
          bgImage={`linear-gradient(to bottom, ${mode(
            theme.colors.white,
            theme.colors.dark[900],
          )}, ${mode(theme.colors.gray[200], theme.colors.dark[400])})`}
          borderBottom='2px solid'
          borderColor={mode('gray.300', 'dark.800')}
        >
          <HomeHero />
        </Box>

        <Box as='section' id='intro' {...containerProps} pt={{ base: 12, md: 16 }}>
          <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
            {t('intro.part1')}
          </Text>
          <Text fontSize={{ base: 'md', md: 'lg' }}>{t('intro.part2')}</Text>
        </Box>

        <Box as='section' id='tech' {...containerProps}>
          <SectionTitle title={t('tech.title')} subtitle={t('tech.subtitle')} />
          <TechGrid techs={techs} />
        </Box>

        <Box as='section' id='work' {...containerProps}>
          <SectionTitle title={t('work.title')} subtitle={t('work.subtitle')} />
          <WorkItem
            hasBottomDivider
            title={t('work.oxeva.title')}
            subtitle={t('work.oxeva.subtitle')}
            description={t('work.oxeva.description')}
            role={t('work.oxeva.role')}
            duration={t('work.oxeva.duration')}
            techs={[
              'React',
              'Sass',
              'Storybook',
              'Styled-Components',
              'GitLab CI',
              'Webpack',
              'Rollup',
              'Semantic-Release',
            ]}
            links={[{ name: t('work.oxeva.link.name'), url: t('work.oxeva.link.url') }]}
            image={{
              src: '/images/work/oxeva.png',
              alt: t('work.oxeva.image-alt'),
            }}
          />
          <WorkItem
            hasBottomDivider
            title={t('work.restaurant.title')}
            subtitle={t('work.restaurant.subtitle')}
            description={t('work.restaurant.description')}
            role={t('work.restaurant.role')}
            duration={t('work.restaurant.duration')}
            techs={[
              'React',
              'Next.js',
              'React Native',
              'Chakra-UI',
              'Firebase',
              'Stripe',
              'Vercel',
            ]}
            image={{
              src: '/images/work/restaurant.png',
              alt: t('work.restaurant.image-alt'),
            }}
          />
          <WorkItem
            title={t('work.lacapsule.title')}
            subtitle={t('work.lacapsule.subtitle')}
            description={t('work.lacapsule.description')}
            role={t('work.lacapsule.role')}
            duration={t('work.lacapsule.duration')}
            techs={['React', 'Node', 'MongoDB', 'Express.js']}
            links={[{ name: t('work.lacapsule.link.name'), url: t('work.lacapsule.link.url') }]}
            image={{
              src: '/images/work/lacapsule.png',
              alt: t('work.lacapsule.image-alt'),
            }}
          />
        </Box>

        <Box as='section' id='contact' {...containerProps} pb={{ base: 16, md: 20 }}>
          <SectionTitle title={t('contact.title')} />
          <Text fontSize={{ base: 'md', md: 'lg' }} pt={4} pb={6}>
            {t('contact.body')}
          </Text>
          <Flex gap={2} flexWrap='wrap' align='center'>
            <Button variant='glow' as='a' href='mailto:mehdi@amrane.fr'>
              {t('contact.button')}
            </Button>
            <Divider
              orientation='vertical'
              mx={2}
              h={6}
              borderColor={mode('blackAlpha.400', 'whiteAlpha.400')}
            />
            <IconButton
              as='a'
              href='https://linkedin.com/in/mehdiamrane'
              target='_blank'
              rel='noreferrer'
              aria-label='LinkedIn'
              colorScheme='gray'
              icon={<FaLinkedin />}
              variant='solid'
              fontSize={20}
            />
            <IconButton
              as='a'
              href='https://github.com/mehdiamrane'
              target='_blank'
              rel='noreferrer'
              aria-label='Github'
              colorScheme='gray'
              icon={<FaGithub />}
              variant='solid'
              fontSize={20}
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};
