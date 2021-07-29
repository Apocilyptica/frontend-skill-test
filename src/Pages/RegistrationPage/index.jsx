import React from "react";

// Components
import SignUp from "../../components/SignUp";

// Hooks
import useSetPageDetials from "../../Hooks/useSetPageDetails";

const RegistrationPage = (props) => {
  useSetPageDetials(props);

  return (
    <div>
      <SignUp {...props} />
    </div>
  );
};

export default RegistrationPage;
