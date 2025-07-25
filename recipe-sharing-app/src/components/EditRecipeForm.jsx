import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipeId }) => {
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  );
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedRecipe = {
      id: recipe.id,
      title: formData.get('title'),
      description: formData.get('description')
    };
    updateRecipe(updatedRecipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" defaultValue={recipe.title} />
      <textarea name="description" defaultValue={recipe.description} />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipeForm;
