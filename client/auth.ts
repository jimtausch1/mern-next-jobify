import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
// import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string; password: string };
        const res = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const user = await res.json();
        if (res.ok) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // ...authConfig.callbacks,
    async session({ session, user, trigger, token }) {
      if (session.user) {
        // Set the user ID from the token
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.name = token.name;

        // If there is an update, set the user name
        if (trigger === 'update') {
          session.user.name = user.name;
        }
      }

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role ?? '';

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
            // const sessionCart = await prisma.cart.findFirst({
            //   where: { sessionCartId },
            // });
            // if (sessionCart) {
            //   // Delete current user cart
            //   // await prisma.cart.deleteMany({
            //   //   where: { userId: user.id },
            //   // });
            //   // // Assign new cart
            //   // await prisma.cart.update({
            //   //   where: { id: sessionCart.id },
            //   //   data: { userId: user.id },
            //   // });
            // }
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
});
