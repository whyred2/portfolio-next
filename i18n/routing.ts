import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['ru', 'ua', 'en', 'jp'],
  defaultLocale: 'ru',
  localePrefix: {
    mode: 'always',
    prefixes: {
      'ru': '/ru',
      'ua': '/ua',
      'en': '/en',
      'jp': '/jp',
    }
  },
});

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);