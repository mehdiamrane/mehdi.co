export const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const formatPostDate = (dateString: string, simpleLocale: 'fr' | 'en'): string => {
  const locale = simpleLocale === 'fr' ? 'fr-FR' : 'en-US';

  const date = new Date(isJsonString(dateString) ? JSON.parse(dateString) : dateString);
  const formatedDate = date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return formatedDate;
};
