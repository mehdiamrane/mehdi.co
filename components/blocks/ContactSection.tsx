import React, { useEffect } from 'react';
import { Button, useBreakpointValue as breakpoint } from '@chakra-ui/react';
import { RiChat1Line } from 'react-icons/ri';
import CustomLink from 'components/shared/CustomLink';
import { MotionHeading, MotionBox, MotionContainer, MotionFlex } from 'components/motion';
import { delayStaggerInView, fadeIn } from 'styles/animations';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useTranslation from 'hooks/useTranslation';

const ContactSection = () => {
  const { t } = useTranslation('home');

  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);

  return (
    <MotionFlex
      initial='initial'
      animate={controls}
      variants={delayStaggerInView}
      ref={ref}
      align='center'
      justify='center'
      flexDir='column'
      textAlign='center'
    >
      <MotionHeading variants={fadeIn} as='h2' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={500}>
        {t('contact.title')}
      </MotionHeading>
      <MotionContainer
        variants={fadeIn}
        fontSize={{
          base: 'sm',
          sm: 'md',
          md: 'lg',
          lg: 'xl',
        }}
        pt={{ base: 2, sm: 4, md: 6 }}
        pb={{ base: 8, sm: 10, md: 12 }}
      >
        {t('contact.body')}
      </MotionContainer>
      <MotionBox variants={fadeIn}>
        <CustomLink href='/contact' bare>
          <Button as='div' variant='glow' size={breakpoint({ base: 'sm', sm: 'md', md: 'lg' })} rightIcon={<RiChat1Line />}>
            {t('contact.button')}
          </Button>
        </CustomLink>
      </MotionBox>
    </MotionFlex>
  );
};

export default ContactSection;
