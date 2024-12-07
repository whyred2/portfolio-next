import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { routing } from './i18n/routing';

async function withAuth(req) {
  const token = await getToken({ req })

  const baseRestrictedPaths = ['/sign-in', '/sign-up'];
  const currentLocale = req.nextUrl.pathname.split('/')[1];
  const localizedRestrictedPaths = baseRestrictedPaths.map(path => `/${currentLocale}${path}`);

  if (token && localizedRestrictedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(`/${currentLocale}/`, req.url));
  }

  return null;
}

export default async function middleware(req) {
  const authCheck = await withAuth(req);
  if (authCheck) return authCheck;

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: [
    '/(ru|ua|en|jp)/:path*',
    '/',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
