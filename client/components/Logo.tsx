import Image from 'next/image';
import logo from '../assets/images/logo.svg';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return <Image src={logo} alt="jobify" className={className ? className : 'logo'} />;
}
