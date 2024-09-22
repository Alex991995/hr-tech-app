'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='flex h-screen justify-center items-center flex-col gap-4' >
      <h2 className='text-3xl'>{error.message}</h2>
      <div>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
      
    </div>
  );
}
