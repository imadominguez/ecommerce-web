import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { NextResponse } from 'next/server';

const { auth: middleware } = NextAuth(authConfig);

const publicRoutes = ['/', '/login', '/register', '/products'];

export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  const isAdmin = auth?.user.role === 'admin';
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // Redirección a la página de inicio
  const redirectToHome = NextResponse.redirect(new URL('/', nextUrl));

  if (nextUrl.pathname.startsWith('/products/')) {
    return NextResponse.next();
  }
  // Redirigir a la página de inicio si no es una ruta pública y el usuario no es un administrador
  if (!isPublicRoute && !isAdmin) {
    return redirectToHome;
  }
  // Redirigir a la página de inicio si el usuario ya está autenticado y trata de acceder a /login o /register
  if (isLoggedIn && ['/login', '/register'].includes(nextUrl.pathname)) {
    return redirectToHome;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
