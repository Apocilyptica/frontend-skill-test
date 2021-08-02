import React from "react";

// Hooks
import useSetPageDetials from "../../Hooks/useSetPageDetails";

// Components
import Recipes from "../../components/Recipes";

const RecipesPage = React.memo((props) => {
  useSetPageDetials(props);

  return <Recipes {...props} />;
});

export default RecipesPage;
