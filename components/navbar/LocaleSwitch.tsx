import React from 'react';
import { useRouter } from 'next/router';
import { Tooltip, IconButton } from '@chakra-ui/react';
import { France, US } from 'components/shared/CustomIcons';
import useTranslation from 'hooks/useTranslation';

const LocaleSwitch = ({ ml }: { ml: object }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleLocaleChange = () => {
    const value = router.locale === 'fr' ? 'en' : 'fr';

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <Tooltip
      hasArrow
      rounded='sm'
      label={t(router.locale === 'fr' ? 'nav.toggle_english' : 'nav.toggle_french')}
      aria-label={t('nav.toggle_locale')}
    >
      <IconButton
        fontSize='md'
        size='sm'
        variant='solid'
        icon={router.locale === 'fr' ? <France /> : <US />}
        aria-label={t('nav.toggle_locale')}
        colorScheme='gray'
        onClick={handleLocaleChange}
        ml={ml}
      />
    </Tooltip>
  );
};

export default LocaleSwitch;
