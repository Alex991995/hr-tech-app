'use client';

import { useCookies } from 'next-client-cookies';
import { LoginForm } from '@/components/LoginForm';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { LoginType } from './interface';
import { LOGIN_MUTATION } from './constants/query';

export default function Home() {
  const cookies = useCookies();
  const [addUser, { data, error }] = useMutation<LoginType>(LOGIN_MUTATION);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (data) {
      cookies.set('jwtToken', data.login.access_token);
      router.push('/timeOffPage');
    }
    if (error) return;
  }, [data, error, cookies, router]);

  function logIn() {
    if (email && password) {
      addUser({
        variables: {
          email: email,
          password: password,
        },
      });
    }
  }

      // email: 'john@mail.com',
      // password: 'changeme',

  return (
    <section className="flex flex-col items-center h-full justify-center gap-4">
      <h2 className="text-3xl">Login Page</h2>
      <LoginForm logIn={logIn} setEmail={setEmail} setPassword={setPassword} />
    </section>
  );
}
