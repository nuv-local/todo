import React, { useState } from "react";
import './login.css';
import SignUp from "./signup";
import SignIn from "./signin";

export default function Login() {
  const [signup, setSignup] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passConfError, setPassConfError] = useState('');

  const sendData = async (e) => {
    e.preventDefault();
    const url = signup ? '/signup' : '/signin';
    const { errors } = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams(new FormData(e.target))
    })
      .then((res) => res.json());

    setEmailError(errors?.email | '');
    setPasswordError(errors?.password | '');
    setPassConfError(errors?.passwordConfirmation | '');

    if (!errors) window.location.reload();
  };

  const switchLogin = () => setSignup(!signup)

  if (signup) {
    return <SignUp
      submit={sendData}
      switch={switchLogin}
      emailError={emailError}
      passwordError={passwordError}
      passConfError={passConfError}
    />
  };

  return <SignIn
    submit={sendData}
    switch={switchLogin}
    emailError={emailError}
    passwordError={passwordError}
  />
}