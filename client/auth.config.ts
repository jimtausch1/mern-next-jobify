import { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    async authorized({ request, auth }) {
      // Array of regex patterns of paths we want to protect
      const protectedPaths = [
        /\/shipping-address/,
        /\/payment-method/,
        /\/dashboard/,
        /\/profile/,
        /\/user\/(.*)/,
        /\/order\/(.*)/,
        /\/admin/,
      ];

      // Get pathname from the req URL object
      const { pathname } = request.nextUrl;
      const token = request.cookies.get('next-auth.session-token')?.value;
      // const tokenit = await getToken({ req: request, secret: process.env.JWT_SECRET }); // Pass the request object and the secret
      // Check if user is not authenticated and accessing a protected path
      if (!token && protectedPaths.some((p) => p.test(pathname))) return false;

      // const { userId, role } = verifyJWT(token) as JwtPayload;

      return true;
    },
  },
};
