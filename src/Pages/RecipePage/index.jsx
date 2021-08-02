import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRecipe, setPageDetails } from "../../redux/PageDetails/pageDetails.actions";

// Components
import Recipe from "../../components/Recipe";

const mapState = ({ recipes, currentPage }) => ({
  recipes: recipes.recipes,
  recipeSet: currentPage.recipeSet,
});

const RecipePage = (props) => {
  const dispatch = useDispatch();
  const { recipes, recipeSet } = useSelector(mapState);
  const recipe = recipes.find((obj) => obj.uuid === props.match.params.uuid);

  useEffect(() => {
    dispatch(setPageDetails({ title: recipe.title, description: recipe.description }));
    dispatch(setCurrentRecipe(recipe));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  return recipeSet && <Recipe {...props} recipe={recipe} />;
};

export default RecipePage;
