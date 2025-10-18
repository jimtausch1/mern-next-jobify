import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    sub: string;
    role: string;
    name: string;
    jwt: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      token: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
  }
}
