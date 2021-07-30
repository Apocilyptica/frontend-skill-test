import React from "react";

// Components
import Recipes from "../../components/Recipes";

const RecipesPage = React.memo((props) => {
  return <Recipes {...props} />;
});

export default RecipesPage;
