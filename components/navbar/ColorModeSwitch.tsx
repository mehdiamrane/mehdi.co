import React from 'react';
import { IconButton, useColorMode, Tooltip } from '@chakra-ui/react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import useSound from 'use-sound';
import useTranslation from 'hooks/useTranslation';

const ColorModeSwitch = ({ ml }: { ml: object }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation('common');
  const [play] = useSound(colorMode === 'light' ? '/sounds/switch-off.mp3' : '/sounds/switch-on.mp3');

  const handleClick = () => {
    toggleColorMode();
    play();
  };

  return (
    <Tooltip
      hasArrow
      rounded='sm'
      label={t(colorMode === 'light' ? 'nav.enable_dark_mode' : 'nav.enable_light_mode')}
      aria-label={t('nav.toggle_color_mode')}
    >
      <IconButton
        fontSize='md'
        size='sm'
        variant='solid'
        isLoading={!colorMode}
        icon={colorMode === 'light' ? <IoSunny /> : <IoMoon />}
        aria-label={t('nav.toggle_color_mode')}
        colorScheme='gray'
        onClick={handleClick}
        ml={ml}
      />
    </Tooltip>
  );
};

export default ColorModeSwitch;
