// import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/server";

import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function middleware(request: any) {
  return withAuth(request);
}

export const config = {
  matcher: ['/dashboard/:path*', '/apps/:path*', '/auth-callback', '/billing/:path*']
};

// export default authMiddleware;

// import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server';

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
// };

// export default authMiddleware;
