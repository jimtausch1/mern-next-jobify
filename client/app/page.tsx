import styles from '@/assets/css/LandingPage.module.css';
import main from '@/assets/main.svg';
import Logo from '@/components/Logo';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className={styles.section}>
      <nav>
        <Logo />
      </nav>
      <div className={`container ${styles.page}`}>
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin
            coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry
            meggings +1 brunch narwhal.
          </p>
          <Link href="/register" className={`btn ${styles.btn} ${styles['register-link']}`}>
            Register
          </Link>
          <Link href="/login" className={`btn ${styles.btn}`}>
            Login / Demo User
          </Link>
        </div>
        <Image src={main} alt="job hunt" className={`img ${styles['main-img']}`} />
      </div>
    </section>
  );
}
