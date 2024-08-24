import Form from "./components/Form";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { email, setEmail, password, setPassword, error, authRequestHandler } =
    useAuth(`${process.env.REACT_APP_BACKEND_URL}/user/login`, "/products");

  return (
    <Form
      credentials={{
        heading: "Sign In",
        link: "signup",
        navlinkText: "Sign up",
        buttonText: "Login",
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

export default Login;
