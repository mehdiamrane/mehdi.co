import React, { FC } from 'react';
import { IoArrowForwardSharp } from 'react-icons/io5';

import Link from 'components/shared/Link';

import useTranslation from 'hooks/useTranslation';

import { Flex, Heading, Button, Text } from '@chakra-ui/react';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  moreHref?: string;
};

const SectionTitle: FC<SectionTitleProps> = ({ title, subtitle, moreHref }) => {
  const { t } = useTranslation('common');

  return (
    <Flex
      align='center'
      borderBottom='2px solid'
      borderColor='gray.200'
      gap={2}
      justify='space-between'
      mt={2}
      pb={2}
      mb={2}
      pt={14}
    >
      <div>
        <Heading
          as='h2'
          color='gray.900'
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight='medium'
          lineHeight='tall'
        >
          {title}
        </Heading>
        {subtitle ? (
          <Text color='gray.800' fontSize={{ base: 'md', md: 'lg' }} mt={1}>
            {subtitle}
          </Text>
        ) : null}
      </div>
      {moreHref ? (
        <Link bare href={moreHref}>
          <Button size='sm' variant='secondary' rightIcon={<IoArrowForwardSharp />}>
            {t('misc.more')}
          </Button>
        </Link>
      ) : null}
    </Flex>
  );
};

export default SectionTitle;
