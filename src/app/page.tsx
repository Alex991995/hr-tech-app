'use client';

import { useCookies } from 'next-client-cookies';
import { LoginForm } from '@/components/LoginForm';
import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

interface LoginType {
  login: {
    access_token: string;
    refresh_token: string;
    readonly __typename: string;
  };
}

export default function Home() {
  const cookies = useCookies();
  const [addUser, { data, error }] = useMutation<LoginType>(LOGIN_MUTATION);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // const jwtToken: string | undefined = cookies.get('jwtToken');

  //  const { data, loading } = useQuery(USER_QUERY, {
  //   context: {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   },
  // });

  useEffect(() => {
    if (data) {
      cookies.set('jwtToken', data.login.access_token);
      router.push('/timeOffPage');
    }
    if (error) {
      console.error('Login failed:', error);
    }
  }, [data, error, cookies, router]);

  console.log(email);
    console.log(password);

  function logIn() {
    console.log(email);
    console.log(password);

    if (email && password) {
      addUser({
        variables: {
          email: email,
          password: password,
        },
      });
    }

    // addUser({
    //   variables: {
    //     email: 'john@mail.com',
    //     password: 'changeme',
    //   },
    // });
  }

  // useEffect(() => {
  //   addUser({
  //     variables: {
  //       email: 'john@mail.com',
  //       password: 'changeme',
  //     },
  //   });
  // }, []);

  return (
    <section className="flex flex-col items-center h-full justify-center gap-4">
      <h2 className="text-3xl">Login Page</h2>
      <LoginForm logIn={logIn} setEmail={setEmail} setPassword={setPassword} />
    </section>
  );
}
