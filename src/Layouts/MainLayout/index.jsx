import React from "react";

// Components
import Header from "../../components/Header";
import PageInfoCard from "../../components/PageInfoCard";

// Material-ui
import Paper from "@material-ui/core/Paper";

const MainLayout = React.memo((props) => {
  return (
    <>
      <Header {...props} />
      <PageInfoCard {...props} />
      <Paper square elevation={0}>
        {props.children}
      </Paper>
      {/* <Footer /> */}
    </>
  );
});

export default MainLayout;
