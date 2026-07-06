export type Lang = 'en' | 'fr';

export const techIcons: Record<string, string> = {
  'React': '/images/techs/react.svg',
  'TypeScript': '/images/techs/typescript.svg',
  'Next.js': '/images/techs/nextjs.svg',
  'Node.js': '/images/techs/nodejs.svg',
  'React Native': '/images/techs/react-native.svg',
  'CSS': '/images/techs/css.svg',
  'Firebase': '/images/techs/firebase.svg',
  'Git': '/images/techs/git.svg',
  'JavaScript': '/images/techs/javascript.svg',
  'npm': '/images/techs/npm.svg',
  'Sass': '/images/techs/sass.svg',
  'Styled-Components': '/images/techs/styled-components.svg',
  'Expo': '/images/techs/expo.svg',
  'Convex': '/images/techs/convex.svg',
  'Hono.js': '/images/techs/hono.svg',
  'Express.js': '/images/techs/express.svg',
  'MongoDB': '/images/techs/mongodb.svg',
  'Stripe': '/images/techs/stripe.svg',
  'Tailwind CSS': '/images/techs/tailwindcss.svg',
  'Chakra-UI': '/images/techs/chakraui.svg',
  'Storybook': '/images/techs/storybook.svg',
  'GitHub Actions': '/images/techs/githubactions.svg',
  'GitLab CI': '/images/techs/gitlab.svg',
  'Docker': '/images/techs/docker.svg',
  'Semantic-Release': '/images/techs/semanticrelease.svg',
  'Webpack': '/images/techs/webpack.svg',
  'Rollup': '/images/techs/rollupjs.svg',
  'Jest': '/images/techs/jest.svg',
  'Playwright': '/images/techs/playwright.svg',
  'Sentry': '/images/techs/sentry.svg',
  'React Query': '/images/techs/reactquery.svg',
  'Google Tag Manager': '/images/techs/googletagmanager.svg',
  'Vercel': '/images/techs/vercel.svg',
};

export const techStack = [
  'TypeScript', 'JavaScript', 'React', 'Next.js', 'React Native', 'Expo',
  'Node.js', 'Convex', 'Hono.js', 'Express.js', 'MongoDB', 'Stripe',
  'Tailwind CSS', 'Chakra-UI', 'Styled-Components', 'Sass', 'CSS',
  'Firebase', 'Storybook', 'Git', 'GitHub Actions', 'GitLab CI', 'Docker',
  'Semantic-Release', 'Webpack', 'Rollup', 'Jest', 'Playwright', 'Sentry',
  'React Query', 'Google Tag Manager', 'npm',
];

export interface Job {
  role: string;
  company: string;
  url: string | null;
  period: string;
  location: string;
  image: string | null;
  imageAlt?: string;
  highlights: string[];
  techs: string[];
}

export interface PageContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    name: string;
    description: string;
  };
  links: { label: string; href: string; icon: string; external?: boolean }[];
  experienceTitle: string;
  techStackTitle: string;
  experience: Job[];
}

const content: Record<Lang, PageContent> = {
  en: {
    meta: {
      title: 'Mehdi Amrane — Senior Front-End Developer',
      description: 'Senior Front-End Developer specializing in React, Next.js, and TypeScript. Based in Paris.',
    },
    hero: {
      name: 'Mehdi Amrane',
      description: 'Senior Front-End Developer. React, Next.js, TypeScript. Based in Paris. I build SaaS products, mobile apps, and clean codebases.',
    },
    links: [
      { label: 'Email', href: 'mailto:me.amrane@icloud.com', icon: 'envelope' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mehdiamrane', icon: 'linkedin-logo' },
      { label: 'GitHub', href: 'https://github.com/mehdiamrane', icon: 'github-logo' },
      { label: 'X', href: 'https://x.com/indiemehdi', icon: 'x-logo' },
      { label: 'CV', href: '/cv', icon: 'file-text', external: false },
      { label: 'Blog', href: '/blog', icon: 'article', external: false },
    ],
    experienceTitle: 'Experience',
    techStackTitle: 'Tech Stack',
    experience: [
      {
        role: 'Co-founder & Full-Stack Developer',
        company: 'Inkvoice',
        url: null,
        period: '2025 – Present',
        location: 'Paris, Remote',
        image: null,
        highlights: [
          'Architected and built a mobile-first SaaS for tattoo artists (React Native, Expo, Convex)',
          'Marketing site (Next.js), Stripe subscriptions & webhooks',
          'Monorepo (NPM Workspaces), CI/CD via GitHub Actions, Dokploy, Sentry',
        ],
        techs: ['React Native', 'Expo', 'Next.js', 'TypeScript', 'Convex', 'Stripe', 'GitHub Actions', 'Sentry'],
      },
      {
        role: 'Front-End Developer',
        company: 'Shadow',
        url: 'https://eu.shadow.tech/shop/fr-fr',
        period: '2022 – 2025 · 2 yr 10 mo',
        location: 'Paris',
        image: '/images/work/shadow.png',
        imageAlt: 'Shadow shop & customer portal interface',
        highlights: [
          'Owned the shop & customer portal (subscriptions, B2C/B2B addons, payments) within a 6-dev team',
          'Designed and shipped an anti-churn flow, reducing cancellation rate by 10%',
          'Set up unit & E2E testing strategy, reorganized codebase, mentored junior devs',
        ],
        techs: ['React', 'TypeScript', 'Storybook', 'Styled-Components', 'GitLab CI', 'React Query', 'Google Tag Manager'],
      },
      {
        role: 'Front-End Developer',
        company: 'Oxeva / Nua.ge',
        url: 'https://nua.ge/',
        period: '2021 – 2022 · 1 yr 5 mo',
        location: 'Paris',
        image: '/images/work/oxeva.png',
        imageAlt: 'Oxeva / Nua.ge component library in Storybook',
        highlights: [
          'Built a 50+ component internal library (Atomic Design, Styled-Components, Storybook)',
          'Set up CI/CD pipeline (GitLab CI, Semantic-Release), 80% test coverage',
          'Owned the JavaScript SDK (bug fixes, features, NPM releases)',
        ],
        techs: ['React', 'Sass', 'Storybook', 'Styled-Components', 'GitLab CI', 'Semantic-Release', 'Webpack', 'Rollup'],
      },
      {
        role: 'Freelance Web & Mobile Developer',
        company: 'Restaurant sector',
        url: null,
        period: '2020 – 2021 · 9 mo',
        location: 'Lyon',
        image: '/images/work/restaurant.png',
        imageAlt: 'Restaurant online ordering web app',
        highlights: [
          'End-to-end ordering web app (React, Next.js, Firebase, Stripe), 30% customer growth, ~500 orders',
          'Mobile order management app (React Native, Fastlane, Firebase App Distribution)',
        ],
        techs: ['React', 'Next.js', 'React Native', 'Chakra-UI', 'Firebase', 'Stripe', 'Vercel'],
      },
      {
        role: 'Front-End Development Instructor',
        company: 'La Capsule',
        url: 'https://www.lacapsule.net/',
        period: 'Teaching role',
        location: 'Paris',
        image: '/images/work/lacapsule.png',
        imageAlt: 'La Capsule coding bootcamp session',
        highlights: [
          'Taught web development fundamentals (React, Node.js, Express.js, MongoDB) to career-changer cohorts',
          'Reviewed student projects and provided 1:1 mentorship throughout the bootcamp',
        ],
        techs: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      },
    ],
  },
  fr: {
    meta: {
      title: 'Mehdi Amrane — Développeur Front-End Senior',
      description: 'Développeur Front-End Senior spécialisé en React, Next.js et TypeScript. Basé à Paris.',
    },
    hero: {
      name: 'Mehdi Amrane',
      description: 'Développeur Front-End Senior. React, Next.js, TypeScript. Basé à Paris. Je construis des SaaS, des apps mobiles, et des codebases propres.',
    },
    links: [
      { label: 'Email', href: 'mailto:me.amrane@icloud.com', icon: 'envelope' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mehdiamrane', icon: 'linkedin-logo' },
      { label: 'GitHub', href: 'https://github.com/mehdiamrane', icon: 'github-logo' },
      { label: 'X', href: 'https://x.com/indiemehdi', icon: 'x-logo' },
      { label: 'CV', href: '/fr/cv', icon: 'file-text', external: false },
      { label: 'Blog', href: '/fr/blog', icon: 'article', external: false },
    ],
    experienceTitle: 'Expérience',
    techStackTitle: 'Stack Technique',
    experience: [
      {
        role: 'Co-founder & Full-Stack Developer',
        company: 'Inkvoice',
        url: null,
        period: '2025 – Présent',
        location: 'Paris, Remote',
        image: null,
        highlights: [
          "Conception et développement d'un SaaS mobile-first pour tatoueurs (React Native, Expo, Convex)",
          'Site vitrine (Next.js), abonnements et webhooks Stripe',
          'Monorepo (NPM Workspaces), CI/CD via GitHub Actions, Dokploy, Sentry',
        ],
        techs: ['React Native', 'Expo', 'Next.js', 'TypeScript', 'Convex', 'Stripe', 'GitHub Actions', 'Sentry'],
      },
      {
        role: 'Front-End Developer',
        company: 'Shadow',
        url: 'https://eu.shadow.tech/shop/fr-fr',
        period: '2022 – 2025 · 2 ans 10 mois',
        location: 'Paris',
        image: '/images/work/shadow.png',
        imageAlt: 'Interface de la boutique et du portail client Shadow',
        highlights: [
          "Responsable de la boutique et de l'espace client (abonnements, options B2C/B2B, paiements) au sein d'une équipe de 6 développeurs",
          "Conception et mise en production d'un parcours anti-churn, réduisant le taux d'annulation de 10%",
          'Mise en place d\'une stratégie de tests unitaires et E2E, réorganisation du code, mentorat de développeurs juniors',
        ],
        techs: ['React', 'TypeScript', 'Storybook', 'Styled-Components', 'GitLab CI', 'React Query', 'Google Tag Manager'],
      },
      {
        role: 'Front-End Developer',
        company: 'Oxeva / Nua.ge',
        url: 'https://nua.ge/',
        period: '2021 – 2022 · 1 an 5 mois',
        location: 'Paris',
        image: '/images/work/oxeva.png',
        imageAlt: 'Librairie de composants Oxeva / Nua.ge dans Storybook',
        highlights: [
          "Développement d'une librairie interne de plus de 50 composants (Atomic Design, Styled-Components, Storybook)",
          "Mise en place d'un pipeline CI/CD (GitLab CI, Semantic-Release), 80% de couverture de tests",
          'Responsable du SDK JavaScript (correctifs, fonctionnalités, publications NPM)',
        ],
        techs: ['React', 'Sass', 'Storybook', 'Styled-Components', 'GitLab CI', 'Semantic-Release', 'Webpack', 'Rollup'],
      },
      {
        role: 'Freelance Web & Mobile Developer',
        company: 'Secteur de la restauration',
        url: null,
        period: '2020 – 2021 · 9 mois',
        location: 'Lyon',
        image: '/images/work/restaurant.png',
        imageAlt: 'Application web de commande en ligne pour restaurant',
        highlights: [
          'Application web de commande de bout en bout (React, Next.js, Firebase, Stripe), +30% de clients, ~500 commandes',
          'Application mobile de gestion des commandes (React Native, Fastlane, Firebase App Distribution)',
        ],
        techs: ['React', 'Next.js', 'React Native', 'Chakra-UI', 'Firebase', 'Stripe', 'Vercel'],
      },
      {
        role: 'Front-End Development Instructor',
        company: 'La Capsule',
        url: 'https://www.lacapsule.net/',
        period: 'Formateur',
        location: 'Paris',
        image: '/images/work/lacapsule.png',
        imageAlt: 'Session de bootcamp de code chez La Capsule',
        highlights: [
          "Enseignement des fondamentaux du développement web (React, Node.js, Express.js, MongoDB) à des promotions en reconversion",
          "Revue de projets étudiants et mentorat individuel tout au long de la formation",
        ],
        techs: ['React', 'Node.js', 'MongoDB', 'Express.js'],
      },
    ],
  },
};

export default content;
