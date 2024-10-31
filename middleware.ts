import { NextResponse } from 'next/server';
import { auth } from './src/auth';

const publicRoutes = ['/', '/login', '/register', '/products'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Acceder al rol del usuario
  const userRole = req.auth?.user?.role;
  const isAdmin = userRole === 'admin';

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  if (!isPublicRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)'],
};
