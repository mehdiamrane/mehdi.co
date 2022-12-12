import React, { FC, useMemo } from 'react';
import Link from 'components/shared/Link';
import { Box, Flex, Text, useColorModeValue as mode, Wrap, Tag, TagLabel } from '@chakra-ui/react';
import { formatPostDate } from 'utils';
import { useRouter } from 'next/router';

interface ISidebarItemProps {
  note: Note;
}

const SidebarItem: FC<ISidebarItemProps> = ({ note }) => {
  const router = useRouter();
  const locale = useMemo(() => (router.locale === 'fr' ? 'fr' : 'en'), [router.locale]);

  const {
    data: { title, tags, publishedAt },
    slug,
  } = note;

  const href = `/notes/${slug}`;

  const isActive = router.asPath === href;

  const publishedAtDate = useMemo(() => formatPostDate(publishedAt, locale), [publishedAt, locale]);

  return (
    <Link href={href} bare>
      <Flex
        align='flex-start'
        bgColor={isActive ? mode('brand.100', 'brand.800') : mode('transparent', 'transparent')}
        direction='column'
        borderBottom='1px solid'
        borderColor={mode('gray.300', 'dark.200')}
        gap={2}
        position='relative'
        p={4}
        transition='all 150ms ease'
        _hover={{ bgColor: mode('gray.200', 'dark.200') }}
        _active={{ bgColor: mode('gray.300', 'dark.300') }}
      >
        <Box
          position='absolute'
          top={0}
          left={0}
          h='full'
          maxW='4px'
          minW='4px'
          transition='all 200ms ease-in-out'
          bg={isActive ? mode('brand.500', 'brand.400') : mode('transparent', 'transparent')}
          shadow={isActive ? 'xlFlatBrand' : 'none'}
        />
        <Text as='span' color={mode('gray.900', 'whiteAlpha.900')} fontSize='sm'>
          {title}
        </Text>

        <Text as='span' color={mode('gray.600', 'whiteAlpha.700')} fontFamily='mono' fontSize='xs'>
          {publishedAtDate}
        </Text>

        <Wrap spacing={2} mt={1} shouldWrapChildren direction='row'>
          {tags.map((tagItem, i) => (
            <Tag
              key={`${note.data.title}-${tagItem}-${i}`}
              size='sm'
              colorScheme={mode('dark', 'gray')}
              variant='outline'
              borderRadius='md'
            >
              <TagLabel>{tagItem}</TagLabel>
            </Tag>
          ))}
        </Wrap>
      </Flex>
    </Link>
  );
};

export default SidebarItem;
