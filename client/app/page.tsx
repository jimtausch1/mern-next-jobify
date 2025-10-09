import Image from 'next/image';
import Link from 'next/link';
import main from '../assets/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';

export default function Home() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue bottle single-origin
            coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag adaptogen everyday carry
            meggings +1 brunch narwhal.
          </p>
          <Link href="/register" className="btn register-link">
            Register
          </Link>
          <Link href="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>
        <Image src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
}
