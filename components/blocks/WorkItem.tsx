import React, { FC } from 'react';
import {
  Heading,
  Box,
  Text,
  Image,
  Flex,
  Button,
  Tag,
  Divider,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import Link from 'components/shared/Link';
import { IoArrowForwardSharp } from 'react-icons/io5';

type LinkItem = {
  name: string;
  url: string;
};

type WorkItemProps = {
  title: string;
  subtitle: string;
  description: string;
  role: string;
  duration: string;
  techs: string[];
  links?: LinkItem[];
  image: {
    src: string;
    alt: string;
  };
  hasBottomDivider?: boolean;
};

const WorkItem: FC<WorkItemProps> = ({
  title,
  subtitle,
  description,
  role,
  duration,
  techs,
  links,
  image,
  hasBottomDivider,
}) => {
  return (
    <Box>
      <Flex mt={8} mb={4} align='center' justify='space-between'>
        <Box>
          <Heading as='h3' fontSize='2xl' fontWeight='medium'>
            {title}
          </Heading>
          <Text>{role}</Text>
        </Box>
        <Tag rounded='full' colorScheme='cyan' flexShrink={0}>
          {duration}
        </Tag>
      </Flex>
      <Text mb={4}>{subtitle}</Text>
      <Flex gap={2} mb={6} flexWrap='wrap'>
        {techs.map((tech) => (
          <Tag key={tech} colorScheme={mode('blackAlpha', 'gray')}>
            {tech}
          </Tag>
        ))}
      </Flex>
      <Image src={image.src} alt={image.alt} mb={6} w='full' shadow='lg' rounded='md' />
      <Text mb={6} fontSize='lg' lineHeight='tall'>
        {description}
      </Text>
      <Flex gap={4} mb={8}>
        {links?.map((link) => (
          <Link href={link.url} bare key={link.name}>
            <Button colorScheme={mode('gray', 'gray')} rightIcon={<IoArrowForwardSharp />}>
              {link.name}
            </Button>
          </Link>
        ))}
      </Flex>
      {hasBottomDivider ? <Divider mt={6} mb={4} border='1px solid' /> : null}
    </Box>
  );
};

export default WorkItem;
