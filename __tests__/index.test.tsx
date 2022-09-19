import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from 'pages/index';
import 'testing/matchMedia';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
    };
  },
}));

// jest.mock('react-i18next', () => ({
//   // this mock makes sure any components using the translate hook
//   // can use it without a warning being shown
//   useTranslation: () => {
//     return {
//       t: (str: string) => str,
//       i18n: {
//         // eslint-disable-next-line @typescript-eslint/no-empty-function
//         changeLanguage: () => new Promise(() => {}),
//       },
//     };
//   },
// }));

// jest.mock('react-i18next', () => ({
//   useTranslation: () => ({ t: (key: any) => key }),
//   Trans: ({ children }: { children: any }) => children,
// }));

// TODO: Fix tests with i18n
describe('Homepage', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      // name: /Hi. I'm Mehdi./i,
      name: /hero.title/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
