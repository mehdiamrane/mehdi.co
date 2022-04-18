/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react';
import { Box, BoxProps, useColorModeValue as mode } from '@chakra-ui/react';

type RowProps = {
  bg?: any;
  bgImage?: any;
  bgSize?: any;
  bgGradient?: any;
  borderBottom?: any;
  borderTop?: any;
  borderColor?: any;
  px?: any;
  py?: any;
  maxW?: any;
  children: React.ReactNode;
  styleProps?: CSSProperties | undefined;
  props?: BoxProps | any;
};

const Row = ({
  bg,
  bgImage,
  bgSize,
  bgGradient,
  borderBottom,
  borderTop,
  borderColor,
  px,
  py,
  maxW,
  children,
  styleProps,
  ...props
}: RowProps) => {
  return (
    <Box
      w='full'
      bg={bg || mode('white', 'dark.900')}
      bgGradient={bgGradient}
      borderBottom={borderBottom}
      borderTop={borderTop}
      borderColor={borderColor}
      bgImage={bgImage}
      bgSize={bgSize}
      zIndex={1}
      position='relative'
      style={styleProps}
    >
      <Box w='full' maxW={maxW || '6xl'} mx='auto' px={px || 6} py={py} {...props}>
        {children}
      </Box>
    </Box>
  );
};
export default Row;
