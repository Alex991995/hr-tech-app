'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import notFoundImg from '../assets/notFound.svg';
import Image from 'next/image';

export default function NotFoundPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className=" flex flex-col items-center h-screen justify-center">
      <Image width={700} src={notFoundImg} alt="not-found" />
      <div>
        <Button onClick={() => router.push('/')}>To Main Page</Button>
      </div>
    </div>
  );
}
