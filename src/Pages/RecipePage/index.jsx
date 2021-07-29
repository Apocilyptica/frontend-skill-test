import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import Recipe from "../../components/Recipe";

// Hooks
import useSetPageDetials from "../../Hooks/useSetPageDetails";

const mapState = ({ recipes }) => ({
  recipes: recipes.recipes,
});

const RecipePage = React.memo((props) => {
  const { recipes } = useSelector(mapState);
  const recipe = recipes.find((obj) => obj.uuid === props.match.params.uuid);
  useSetPageDetials(recipe);

  return <Recipe {...props} recipe={recipe} />;
});

export default RecipePage;
