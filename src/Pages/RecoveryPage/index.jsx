import React from "react";

// Components
import EmailPassword from "../../components/EmailPassword";

// Hooks
import useSetPageDetials from "../../Hooks/useSetPageDetails";

const RecoveryPage = (props) => {
  useSetPageDetials(props);

  return <EmailPassword {...props} />;
};

export default RecoveryPage;
