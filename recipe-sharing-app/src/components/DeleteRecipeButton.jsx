import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStoreRecipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Recipe
    </button>
  );
}

export default DeleteRecipeButton;
