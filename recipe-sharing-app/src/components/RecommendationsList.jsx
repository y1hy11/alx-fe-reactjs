import { useRecipesStore } from './recipeStore';

const RecommendationsList = () => {
  const recipes = useRecipesStore(state => state.recipes);
  const searchTerm = useRecipesStore(state => state.searchTerm);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {filteredRecipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;