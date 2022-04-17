import React from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';

const LangSelect = () => {
  const router = useRouter();

  const handleLocaleChange = (event: { target: { value: string } }) => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <select onChange={handleLocaleChange} value={router.locale}>
      <option value='en'>🇺🇸 English</option>
      <option value='fr'>🇸🇪 French</option>
      <option value='es'>🇸🇪 es</option>
    </select>
  );
};

export default LangSelect;
