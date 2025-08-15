import { useState, useEffect } from "react";
import recipeData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <div>
      <div>
        <div>
          <h1>Recipe Sharing Platform</h1>
          <p>
            Discover delicious recipes from around the world and share your
            culinary creations
          </p>
        </div>

        <div>
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              {/* Recipe Image */}
              <div>
                <img src={recipe.image} alt={recipe.title} />
              </div>

              <div>
                <h2>{recipe.title}</h2>
                <p>{recipe.summary}</p>

                <div>
                  <button>View Recipe</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <div>
            <div>🍳</div>
            <h3>No recipes found</h3>
            <p>Start by adding some delicious recipes!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
