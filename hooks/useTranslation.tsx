import { useMemo } from 'react';
import { useTranslation as useNextTranslation } from 'next-i18next';
import { UseTranslationOptions } from 'react-i18next';

export default function useTranslation(namespace?: string, options?: UseTranslationOptions) {
  const { t, i18n } = useNextTranslation(namespace, options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const T = useMemo(() => t, [i18n]);
  return { t: T, i18n };
}

// Fixes translation keys being visible when doing a page transition. Sources:
// https://github.com/isaachinman/next-i18next/issues/1767#issuecomment-1091769453
// https://github.com/vinissimus/next-translate/issues/513
