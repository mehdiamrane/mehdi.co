import React, { FC, useRef } from 'react';
import Draggable from 'react-draggable';
import { Image, useColorModeValue as mode, ImageProps } from '@chakra-ui/react';
import theme from 'styles/theme';

const DraggableImage: FC<ImageProps> = (props) => {
  const imageRef = useRef(null);

  return (
    <Draggable nodeRef={imageRef}>
      <Image
        ref={imageRef}
        draggable='false'
        zIndex='docked'
        pos='relative'
        alt=''
        cursor='grab'
        _hover={{
          filter: `drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(0 0 4px ${mode(
            theme.colors.blackAlpha[500],
            theme.colors.whiteAlpha[500],
          )});`,
        }}
        _active={{
          filter: `drop-shadow(1px 1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(0 0 4px ${mode(
            theme.colors.blackAlpha[700],
            theme.colors.whiteAlpha[700],
          )});`,
          cursor: 'grabbing',
          left: '1px',
          bottom: '1px',
        }}
        {...props}
      />
    </Draggable>
  );
};

export default DraggableImage;
