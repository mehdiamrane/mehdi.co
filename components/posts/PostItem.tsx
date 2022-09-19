import React, { FC, useMemo } from 'react';
import Link from 'components/shared/Link';
import { Flex, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { formatPostDate } from 'utils';
import { useRouter } from 'next/router';

type PostItemProps = {
  postData: {
    title: string;
    href: string;
    publishedAt: string;
  };
};

const PostItem: FC<PostItemProps> = ({ postData }) => {
  const router = useRouter();
  const locale = useMemo(() => (router.locale === 'fr' ? 'fr' : 'en'), [router.locale]);
  const publishedAtDate = useMemo(
    () => formatPostDate(postData.publishedAt, locale),
    [postData.publishedAt, locale],
  );

  return (
    <Link href={postData.href} bare>
      <Flex
        align='center'
        bgColor='transparent'
        rounded='md'
        direction='row'
        gap={2}
        justify='space-between'
        m='0 -1rem'
        px={4}
        py={2}
        transition='all 150ms ease'
        _hover={{ bgColor: mode('gray.200', 'dark.200') }}
        _active={{ bgColor: mode('gray.300', 'dark.300') }}
      >
        <Text
          as='span'
          color={mode('gray.900', 'whiteAlpha.900')}
          fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
          fontWeight='medium'
        >
          {postData.title}
        </Text>
        <Text
          as='span'
          color={mode('gray.600', 'whiteAlpha.600')}
          fontFamily='mono'
          fontSize='sm'
          fontWeight='medium'
          whiteSpace='nowrap'
        >
          {publishedAtDate}
        </Text>
      </Flex>
    </Link>
  );
};

export default PostItem;
