'use client';
import { object, string, ValidationError } from 'yup';

import { useCookies } from 'next-client-cookies';
import { LoginForm } from '@/components/LoginForm';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { ErrorValidationTypes, LoginType } from './interface';
import { LOGIN_MUTATION } from './constants/query';
import { fieldInput } from './constants';

const userSchema = object({
  email: string().email(),
  password: string().required().min(6),
});

export default function Home() {
  const cookies = useCookies();
  const [addUser, { data, error }] = useMutation<LoginType>(LOGIN_MUTATION);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [errorValidation, setErrorValidation] = useState<ErrorValidationTypes>({});

  useEffect(() => {
    if (data) {
      cookies.set('jwtToken', data.login.access_token);
      router.push('/timeOffPage');
    }
    console.log(error);
    if (error) throw new Error(error.message);
  }, [data, error, cookies, router]);

  async function logIn() {
    if (email && password) {
      try {
        await userSchema.validate({ email, password });
        addUser({
          variables: {
            email: email,
            password: password,
          },
        });
      } catch (err) {
        const newObjErrors: ErrorValidationTypes = {};
        if (err instanceof ValidationError) {
          err.errors.forEach(error => {
            if (err.path && fieldInput.includes(err.path)) {
              const key = err.path;
              newObjErrors[key as keyof ErrorValidationTypes] = error;
            }
          });
        }
        setErrorValidation(newObjErrors);
      }
    }
  }

  return (
    <section className="flex flex-col items-center h-full justify-center gap-4">
      <h2 className="text-3xl">Login Page</h2>
      <LoginForm
        logIn={logIn}
        setEmail={setEmail}
        setPassword={setPassword}
        errorValidation={errorValidation}
      />
    </section>
  );
}
