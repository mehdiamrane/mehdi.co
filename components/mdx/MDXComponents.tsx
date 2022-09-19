import React from 'react';
import {
  Box,
  Alert,
  Code,
  Heading,
  Kbd,
  Text,
  Divider,
  Button,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import Link from 'components/shared/Link';
import { copyToClipboard } from 'utils/copyToClipboard';
import { useState, useEffect, useRef } from 'react';
// import Confetti from 'react-dom-confetti';
import useTranslation from 'hooks/useTranslation';

const Table = (props: any) => (
  <Box overflowX='scroll' w='full'>
    <Box as='table' textAlign='left' mt='32px' w='full' fontSize='lg' fontWeight={500} {...props} />
  </Box>
);

const THead = (props: any) => (
  <Box as='th' bg={mode('gray.50', 'dark.600')} fontWeight='800' p={2} fontSize='lg' {...props} />
);

const TData = (props: any) => (
  <Box
    as='td'
    p={2}
    borderTopWidth='1px'
    borderColor='inherit'
    fontSize='lg'
    fontWeight={500}
    whiteSpace='normal'
    {...props}
  />
);

const Quote = (props: any) => (
  <Alert
    mt={4}
    w='full'
    bg={mode('brand.50', 'dark.900')}
    variant='left-accent'
    status='info'
    css={{
      '> *:first-of-type': {
        marginTop: 0,
        marginLeft: 8,
      },
    }}
    {...props}
  />
);

const DocsHeading = (props: any) => (
  <Heading
    css={{
      scrollMarginTop: '0px',
      scrollSnapMargin: '0px', // Safari
      '&[id]': {
        pointerEvents: 'none',
      },
      '&[id]:before': {
        display: 'block',
        height: ' 5rem',
        marginTop: '-5rem',
        visibility: 'hidden',
        content: '""',
      },
      '&[id]:hover a': { opacity: 1 },
    }}
    {...props}
    mb='1em'
    mt='2em'
  >
    <Box pointerEvents='auto'>
      {props.children}
      {props.id && (
        <Box
          aria-label='anchor'
          as='a'
          color='brand.500'
          fontWeight='normal'
          outline='none'
          _focus={{
            opacity: 1,
            boxShadow: 'outline',
          }}
          opacity='0'
          ml='0.375rem'
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </Heading>
);

const Hr = () => <Divider borderColor='gray.200' my={4} w='100%' />;

const Pre = ({ children, ...props }: any) => {
  const { t } = useTranslation('common');

  const preRef = useRef<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = async () => {
    if (preRef.current?.innerText) {
      copyToClipboard(preRef.current.innerText || '');
      setIsCopied(true);
    }
  };

  //   const config = {
  //     angle: 90,
  //     spread: 360,
  //     startVelocity: 40,
  //     elementCount: 70,
  //     dragFriction: 0.12,
  //     duration: 3000,
  //     stagger: 3,
  //     width: '10px',
  //     height: '10px',
  //     perspective: '500px',
  //     colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  //   };

  return (
    <Box pos='relative'>
      <Button
        size='xs'
        variant='solid'
        isDisabled={isCopied}
        pos='absolute'
        top='-30px'
        right={2}
        bg='brand.500'
        shadow='smFlatBrand'
        color='gray.100'
        _hover={{ bg: 'brand.400', color: 'gray.200' }}
        onClick={() => handleCopy()}
        textTransform='uppercase'
      >
        {isCopied ? `🎉 ${t('misc.copied')}` : t('misc.copy')}
      </Button>
      {/* <Box pos='absolute' top='-30px' right={8} {...props}>
        <Confetti active={isCopied} config={config} />
      </Box> */}
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </Box>
  );
};

const MDXComponents = {
  h1: (props: any) => <Heading as='h1' size='xl' my={4} {...props} />,
  h2: (props: any) => <DocsHeading as='h2' fontWeight='bold' size='lg' {...props} />,
  h3: (props: any) => <DocsHeading as='h3' size='md' fontWeight='bold' {...props} />,
  inlineCode: (props: any) => <Code colorScheme='brand' fontSize='0.84em' {...props} />,
  kbd: Kbd,
  br: (props: any) => <Box height='24px' {...props} />,
  hr: Hr,
  table: Table,
  th: THead,
  td: TData,
  a: (props: any) => <Link {...props} />,
  p: (props: any) => (
    <Text as='p' mt={4} lineHeight='tall' fontSize='lg' fontWeight={500} {...props} />
  ),
  ul: (props: any) => (
    <Box as='ul' pt={2} pl={4} ml={2} fontSize='lg' fontWeight={500} {...props} />
  ),
  ol: (props: any) => (
    <Box as='ol' pt={2} pl={4} ml={2} fontSize='lg' fontWeight={500} {...props} />
  ),
  li: (props: any) => <Box as='li' pb={1} fontSize='lg' fontWeight={500} {...props} />,
  blockquote: Quote,
  pre: Pre,
};

export default MDXComponents;
