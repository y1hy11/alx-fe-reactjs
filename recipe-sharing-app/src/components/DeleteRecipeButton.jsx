import { useRecipeStore } from './useRecipeStoreRecipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Recipe
    </button>
  );
}

export default DeleteRecipeButton;
