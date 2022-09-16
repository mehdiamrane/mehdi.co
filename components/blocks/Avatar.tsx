import React from 'react';
import { AspectRatio, Image } from '@chakra-ui/react';
import theme from 'styles/theme';

const Avatar = () => {
  return (
    <AspectRatio
      ratio={1}
      rounded='full'
      bgImage={`linear-gradient(to top, ${theme.colors.blackAlpha[500]}, ${theme.colors.blackAlpha[200]})`}
      backdropFilter='saturate(180%) blur(5px)'
      overflow='hidden'
      w='full'
    >
      <Image
        as='img'
        m='0 auto'
        mt={5}
        objectFit='cover'
        w='80%!important'
        src='/images/avatar.png'
        alt='Avatar Illustration'
      />
    </AspectRatio>
  );
};

export default Avatar;
