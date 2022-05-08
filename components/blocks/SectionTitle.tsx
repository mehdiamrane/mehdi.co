import React, { FC, useEffect } from 'react';
import { MotionBox, MotionHeading, MotionText } from 'components/motion';
import { fadeInUp, delayStaggerInView } from 'styles/animations';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type SectionTitleProps = {
  title: string;
  subtitle: string;
};

const SectionTitle: FC<SectionTitleProps> = ({ title, subtitle }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);

  return (
    <MotionBox ref={ref} initial='initial' animate={controls} variants={delayStaggerInView}>
      <MotionHeading variants={fadeInUp} as='h2' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight={500} mb={2}>
        {title}
      </MotionHeading>
      <MotionText variants={fadeInUp} fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}>
        {subtitle}
      </MotionText>
    </MotionBox>
  );
};

export default SectionTitle;
