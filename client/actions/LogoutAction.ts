'use server';

import { cookies } from 'next/headers';
import { customFetch } from '../utils';

const LogoutAction = async () => {
  // Invalidate the session, e.g., by destroying the session data
  // const session = await getSession();
  // session.destroy();

  try {
    const response = await customFetch.get('/auth/logout');
    if (response.status === 200) {
      // Clear the session cookie
      const nextjsCookies = await cookies();
      nextjsCookies.delete('next-auth.session-token'); // Replace with your actual cookie name

      // Redirect the user to a public page, like the login or home page
      // return redirect('/login');
    }
    // queryClient.invalidateQueries();
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export default LogoutAction;
