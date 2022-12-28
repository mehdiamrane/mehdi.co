import React, { FC, useState, useRef } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Skeleton,
  Icon,
  IconButton,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import {
  IoPlay,
  IoPause,
  IoPlayBack,
  IoPlayForward,
  IoVolumeHigh,
  IoVolumeMute,
  IoLink,
} from 'react-icons/io5';

import { RiHeartFill } from 'react-icons/ri';
import { useTranslation } from 'next-i18next';

interface SpotifyPlayerProps {
  tracks?: SpotifyApi.SavedTrackObject[];
}

interface PlayerIconProps {
  label: string;
  icon: React.ReactElement;
  onClick: any;
  disabled?: boolean;
  size?: 'md' | 'sm';
}
const PlayerIcon: FC<PlayerIconProps> = ({
  icon,
  onClick,
  label,
  disabled = false,
  size = 'sm',
}) => {
  return (
    <IconButton
      isRound
      aria-label={label}
      icon={icon}
      onClick={onClick}
      disabled={disabled}
      size={size}
      fontSize={size === 'md' ? '2xl' : 'xl'}
      variant='ghost'
      colorScheme={mode('blackAlpha', 'gray')}
    />
  );
};

const SpotifyPlayer: FC<SpotifyPlayerProps> = ({ tracks }) => {
  const { t } = useTranslation('common');

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVolume, setHasVolume] = useState(true);
  const audioElement = useRef<HTMLAudioElement>(null);

  const loading = !tracks;

  const height = '368px';

  if (loading) {
    return <Skeleton w='full' h={height} rounded='3xl' />;
  }

  const onTrackChange = (keepPlaying?: boolean) => {
    if (audioElement?.current) {
      audioElement.current.volume = 0;
      audioElement.current.pause();
      audioElement.current.load();
      if (isPlaying || keepPlaying) {
        audioElement.current.play();
      }
      if (hasVolume) {
        audioElement.current.volume = 1;
      }
    }
  };

  const goPreviousTrack = () => {
    if (currentTrackIndex === 0) {
      return;
    }
    setCurrentTrackIndex((prevState) => prevState - 1);
    onTrackChange();
  };

  const goNextTrack = (keepPlaying?: boolean) => {
    if (currentTrackIndex === tracks.length - 1) {
      return;
    }
    setCurrentTrackIndex((prevState) => prevState + 1);
    onTrackChange(keepPlaying);
  };

  const onTrackEnded = () => {
    goNextTrack(true);
  };

  const onTrackPause = () => {
    setIsPlaying(false);
  };

  const onTrackPlay = () => {
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioElement?.current?.pause();
  };

  const playTrack = () => {
    audioElement?.current?.play();
  };

  const handlePlayPause = () => {
    if (audioElement?.current?.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  };

  const openLink = () => {
    pauseTrack();
    window.open(currentTrack.external_urls.spotify, '_blank');
  };

  const toggleVolume = () => {
    if (audioElement?.current) {
      audioElement.current.volume = hasVolume ? 0 : 1;
    }

    setHasVolume((prevState) => !prevState);
  };

  const currentTrack = tracks[currentTrackIndex].track;
  const artists = currentTrack.artists.map((artistObject) => artistObject.name).join(', ');

  return (
    <Box
      rounded='3xl'
      bgImg={currentTrack.album.images[0].url}
      overflow='hidden'
      pos='relative'
      h={height}
    >
      <Flex
        flexDir='column'
        bg={mode('whiteAlpha.700', 'blackAlpha.700')}
        p={6}
        h={height}
        backdropFilter='saturate(180%) blur(50px)'
      >
        <Flex
          align='center'
          justify='center'
          pos='absolute'
          p={3}
          rounded='xl'
          bg={mode('white', 'black')}
          shadow='md'
          right={6}
          top={6}
        >
          <Image
            h={10}
            w={10}
            alt='Spotify Logo'
            src='/images/logos/spotify.png'
            pointerEvents='none'
            userSelect='none'
          />
        </Flex>
        <Image
          rounded='xl'
          h={48}
          w={48}
          alt={currentTrack.album.name}
          src={currentTrack.album.images[0].url}
          shadow='lg'
          pointerEvents='none'
          userSelect='none'
        />
        <Flex py={5} align='center' maxW='full'>
          <Box maxW='calc(100% - 22px - 1.5rem)' mr='1.5rem'>
            <Text
              fontSize='sm'
              fontWeight={600}
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
              display='block'
              color={mode('gray.900', 'white')}
              title={currentTrack.name}
            >
              {currentTrack.name}
            </Text>
            <Text
              fontSize='sm'
              color={mode('gray.800', 'gray.100')}
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
              display='block'
              title={artists}
            >
              {artists}
            </Text>
          </Box>
          <Box title={t('music.liked')}>
            <Icon aria-label={t('music.liked')} as={RiHeartFill} fontSize='22px' color='red.500' />
          </Box>
        </Flex>

        {currentTrack.preview_url ? (
          <audio
            ref={audioElement}
            controls
            style={{ display: 'none' }}
            onEnded={onTrackEnded}
            onPause={onTrackPause}
            onPlay={onTrackPlay}
          >
            <source src={currentTrack.preview_url} />
            {t('music.unsupported')}
          </audio>
        ) : null}

        <Flex
          border='1px solid'
          borderColor={mode('whiteAlpha.900', 'blackAlpha.900')}
          bg={mode('whiteAlpha.100', 'blackAlpha.100')}
          backdropFilter='saturate(180%) blur(5px)'
          rounded='full'
          align='center'
          w='full'
          justify='space-evenly'
          py={1}
        >
          <PlayerIcon
            label={t('music.open_link')}
            icon={<IoLink />}
            onClick={() => openLink()}
            disabled={!currentTrack.external_urls.spotify}
          />
          <PlayerIcon
            label={t('music.previous')}
            icon={<IoPlayBack />}
            onClick={() => goPreviousTrack()}
            disabled={currentTrackIndex === 0}
          />
          <PlayerIcon
            label={t('music.play_pause')}
            icon={isPlaying ? <IoPause /> : <IoPlay />}
            onClick={() => handlePlayPause()}
            disabled={!currentTrack.preview_url}
            size='md'
          />
          <PlayerIcon
            label={t('music.next')}
            icon={<IoPlayForward />}
            onClick={() => goNextTrack()}
            disabled={currentTrackIndex === tracks.length - 1}
          />
          <PlayerIcon
            label={t('music.volume_mute')}
            icon={hasVolume ? <IoVolumeHigh /> : <IoVolumeMute />}
            onClick={() => toggleVolume()}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default SpotifyPlayer;
