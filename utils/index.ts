export const formatPostDate = (dateString: string, simpleLocale: 'fr' | 'en'): string => {
  const locale = simpleLocale === 'fr' ? 'fr-FR' : 'en-US';

  const date = new Date(dateString);
  const formatedDate = date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formatedDate;
};
