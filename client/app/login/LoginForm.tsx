'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import LoginAction from '../../actions/LoginAction';
import styles from '../../assets/css/RegisterAndLogin.module.css';
import FormRow from '../../components/FormRow';
import LoginDemoButton from '../../components/LoginDemoButton';
import Logo from '../../components/Logo';
import SubmitBtn from '../../components/SubmitBtn';

export default function LoginForm() {
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    const response = await LoginAction(formData);
    if (response.msg === 'user logged in') {
      toast.success('Login successful');
      router.push('/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
  }

  return (
    <section className={styles.section}>
      <form action={onSubmit} className="form">
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
