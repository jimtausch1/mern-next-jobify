'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginAction from '../../actions/LoginAction';
import FormRow from '../../components/FormRow';
import LoginDemoButton from '../../components/LoginDemoButton';
import Logo from '../../components/Logo';
import SubmitBtn from '../../components/SubmitBtn';

export default function LoginForm() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const response = await LoginAction(formData);
    if (response.msg === 'user logged in') {
      router.push('/dashboard');
    }
  }

  return (
    <form action={onSubmit} className="form">
      <Logo />
      <h4>login</h4>
      <FormRow type="email" name="email" />
      <FormRow type="password" name="password" />
      <SubmitBtn />
      <LoginDemoButton />
      <p>
        Not a member yet?
        <Link href="/register" className="member-btn">
          Register
        </Link>
      </p>
    </form>
  );
}
