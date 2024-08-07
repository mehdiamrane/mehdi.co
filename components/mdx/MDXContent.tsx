import React, { FC, useMemo } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import {
  Heading,
  Text,
  Box,
  Img,
  TagLabel,
  Tag,
  Wrap,
  Button,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import MDXComponents from 'components/mdx/MDXComponents';
import { formatPostDate } from 'utils';
import useTranslation from 'hooks/useTranslation';
import { useRouter } from 'next/router';
import Link from 'components/shared/Link';
import { IoArrowBackSharp } from 'react-icons/io5';

type MDXContentProps = {
  source: NoteSource;
  frontMatter: NoteFrontMatter;
  topDivRef?: React.LegacyRef<HTMLDivElement>;
};

const MDXContent: FC<MDXContentProps> = ({ frontMatter, source, topDivRef }) => {
  const router = useRouter();
  const { t } = useTranslation('notes');

  const locale = useMemo(() => (router.locale === 'fr' ? 'fr' : 'en'), [router.locale]);
  const publishedAtDate = useMemo(
    () => formatPostDate(frontMatter.publishedAt, locale),
    [frontMatter.publishedAt, locale],
  );

  return (
    <Box as='main' m='0 auto' px={6} w='full' pb={{ base: 12, md: 16 }} maxW='2xl'>
      <Box h={{ base: 24, md: 32 }} ref={topDivRef} />
      <Link href='/notes' bare>
        <Button
          leftIcon={<IoArrowBackSharp />}
          colorScheme={mode('blackAlpha', 'gray')}
          rounded='lg'
          size='sm'
          mb={6}
        >
          {t('notes.back')}
        </Button>
      </Link>
      <Text color='gray.600' fontFamily='mono' fontSize='sm' fontWeight='medium'>
        {publishedAtDate}
      </Text>
      <Heading as='h1' size='xl' my={4}>
        {frontMatter.title}
      </Heading>
      {frontMatter.summary && (
        <Text fontSize='lg' fontWeight={500}>
          {frontMatter.summary}
        </Text>
      )}

      <Wrap spacing={2} mt={4} shouldWrapChildren direction='row'>
        {frontMatter.tags.map((tagItem: string, i: number) => (
          <Tag
            size='md'
            colorScheme={mode('dark', 'gray')}
            variant='solid'
            key={`${frontMatter.title}-${tagItem}-${i}`}
          >
            <TagLabel>{tagItem}</TagLabel>
          </Tag>
        ))}
      </Wrap>

      {frontMatter.image && (
        <Img rounded='md' src={frontMatter.image} alt={frontMatter.title} w='full' my={8} />
      )}

      <MDXRemote {...source} frontmatter={frontMatter} components={MDXComponents} />
    </Box>
  );
};

export default MDXContent;
