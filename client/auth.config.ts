import { JwtPayload } from 'jsonwebtoken';
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { verifyJWT } from '../utils/tokenUtils';
import { customFetch } from './utils';

export const authConfig: NextAuthConfig = {
  debug: true,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const res = await customFetch.post('/auth/login', { email, password });
        const user = await res.data;

        if (res.status === 200) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ], // Required by NextAuthConfig type
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

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      // Assign user fields to token
      if (user) {
        const { userId, role } = verifyJWT((user as any).token) as JwtPayload;
        token.id = userId;
        token.role = role ?? '';

        // If user has no name then use the email
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          // Update database to reflect the token name
          // await prisma.user.update({
          //   where: { id: user.id },
          //   data: { name: token.name },
          // });
        }

        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get('sessionCartId')?.value;
          if (sessionCartId) {
          }
        }
      }

      // Handle session updates
      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name;
      }

      return token;
    },
  },
};
