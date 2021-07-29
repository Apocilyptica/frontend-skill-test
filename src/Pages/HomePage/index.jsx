import React from "react";

// components
import Home from "../../components/Home";

// Hooks
import useSetPageDetials from "../../Hooks/useSetPageDetails";

const HomePage = React.memo((props) => {
  useSetPageDetials(props);

  return <Home {...props} />;
});

export default HomePage;
