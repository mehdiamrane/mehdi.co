import React from 'react';
import { Box, Grid, useBreakpointValue as breakpoint, AspectRatio, useColorModeValue as mode } from '@chakra-ui/react';

import { MotionImg, MotionBox } from 'components/motion';
import { fadeInUpAvatar, popScale } from 'styles/animations';

const AvatarGrid = () => {
  const floatAnimation = breakpoint({ base: 'float-mobile', md: 'float' });
  return (
    <Grid
      mx='auto'
      templateRows='repeat(30, 1fr)'
      templateColumns='repeat(26, 1fr)'
      minW={{
        base: 36,
        sm: 48,
        md: 64,
        lg: 'auto',
      }}
      maxW={{
        base: 36,
        sm: 48,
        md: 64,
        lg: 80,
      }}
      mb={{ base: 4, sm: 6, md: 0 }}
    >
      <AspectRatio ratio={1} gridArea='4 / 1 / 29 / 27'>
        <MotionBox
          variants={popScale}
          rounded='full'
          zIndex={1}
          bgGradient={mode('linear(to-t, blackAlpha.500,blackAlpha.200)', 'linear(to-t, blackAlpha.500,blackAlpha.200)')}
          backdropFilter='saturate(180%) blur(5px)'
        />
      </AspectRatio>
      <AspectRatio ratio={1} gridArea='1 / 1 / 29 / 27'>
        <Box
          roundedBottom='full'
          overflow='hidden'
          style={{
            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          }}
          p={{ base: 0, md: 4 }}
          zIndex={4}
        >
          <MotionImg variants={fadeInUpAvatar} w='full' objectFit='cover' src='/images/avatar.png' alt='Avatar Illustration' zIndex={3} />
        </Box>
      </AspectRatio>
      <AspectRatio ratio={1} gridArea='20 / 1 / 27 / 8'>
        <MotionImg
          variants={popScale}
          animation={`8s ${floatAnimation} 1s ease-in-out infinite`}
          zIndex={4}
          objectFit='contain!important'
          src='/images/coffee.png'
          alt='Coffee Illustration'
        />
      </AspectRatio>
      <AspectRatio ratio={1} gridArea='24 / 20 / 29 / 25'>
        <MotionImg
          variants={popScale}
          animation={`10s ${floatAnimation} 1s ease-in-out infinite`}
          zIndex={4}
          objectFit='contain!important'
          src='/images/pencil.png'
          alt='Pencil Illustration'
        />
      </AspectRatio>
      <AspectRatio ratio={1} gridArea='2 / 20 / 7 / 25'>
        <MotionImg
          variants={popScale}
          animation={`9s ${floatAnimation} 2s ease-in-out infinite`}
          zIndex={2}
          objectFit='contain!important'
          src='/images/bulb.png'
          alt='Light Bulb Illustration'
        />
      </AspectRatio>
      <AspectRatio ratio={1} gridArea='6 / 3 / 10 / 7'>
        <MotionImg
          variants={popScale}
          animation={`10s ${floatAnimation} 1s ease-in infinite`}
          zIndex={0}
          objectFit='contain!important'
          src='/images/floppy.png'
          alt='Floppy Disk Illustration'
        />
      </AspectRatio>
    </Grid>
  );
};

export default AvatarGrid;
