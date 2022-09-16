import React from 'react';
import { useRouter } from 'next/router';
import { France, US } from 'components/shared/CustomIcons';
import useTranslation from 'hooks/useTranslation';
import { Button } from '@chakra-ui/react';

const LocaleSwitch = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleLocaleChange = () => {
    const value = router.locale === 'fr' ? 'en' : 'fr';

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      leftIcon={router.locale === 'fr' ? <France /> : <US />}
      onClick={handleLocaleChange}
    >
      {t(router.locale === 'fr' ? 'nav.toggle_english' : 'nav.toggle_french')}
    </Button>
  );
};

export default LocaleSwitch;
