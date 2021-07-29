import React from "react";

// Components
import SignIn from "../../components/SignIn";

// Hooks
import useSetPageDetials from "../../Hooks/useSetPageDetails";

const LoginPage = (props) => {
  useSetPageDetials(props);

  return <SignIn {...props} />;
};

export default LoginPage;
