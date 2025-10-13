'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from '../../assets/css/RegisterAndLogin.module.css';
import FormRow from '../../components/FormRow';
import LoginDemoButton from '../../components/LoginDemoButton';
import Logo from '../../components/Logo';
import SubmitBtn from '../../components/SubmitBtn';

export default function LoginForm() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (response.ok) {
      toast.success('Login successful');
      router.push('/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  }

  return (
    <section className={styles.section}>
      <form action={handleSubmit} className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <LoginDemoButton />
        <p>
          Not a member yet?
          <Link href="/register" className={styles.memberbtn}>
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
