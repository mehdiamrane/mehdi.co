import React, { useState } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { RiVolumeUpFill, RiVolumeMuteFill } from 'react-icons/ri';
import useSound from 'use-sound';
import useTranslation from 'hooks/useTranslation';

const SoundSwitch = ({ ml }: { ml: object }) => {
  const [hasSounds, setHasSounds] = useState(true);
  const { t } = useTranslation('common');
  const [play] = useSound(hasSounds ? '/sounds/switch-off.mp3' : '/sounds/switch-on.mp3');

  const handleClick = () => {
    setHasSounds(!hasSounds);
    play();
  };

  return (
    <Tooltip hasArrow rounded='sm' label={t(hasSounds ? 'nav.disable_sound' : 'nav.enable_sound')} aria-label={t('nav.toggle_sound')}>
      <IconButton
        fontSize='md'
        size='sm'
        variant='solid'
        icon={hasSounds ? <RiVolumeUpFill /> : <RiVolumeMuteFill />}
        aria-label={t('nav.toggle_sound')}
        colorScheme='gray'
        onClick={handleClick}
        ml={ml}
      />
    </Tooltip>
  );
};

export default SoundSwitch;
