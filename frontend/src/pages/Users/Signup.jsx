import React from "react";
import Form from "./components/Form";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  const { email, setEmail, password, setPassword, error, authRequestHandler } =
    useAuth(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, "/login");

  return (
    <Form
      credentials={{
        heading: "Sign Up",
        link: "login",
        navlinkText: "Log in",
        buttonText: "Register",
      }}
      setEmail={setEmail}
      setPassword={setPassword}
      password={password}
      email={email}
      error={error}
      functionToExecute={authRequestHandler}
    />
  );
};

export default SignUp;
