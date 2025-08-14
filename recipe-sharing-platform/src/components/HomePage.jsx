import { useState, useEffect } from 'react';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <div className="">
      <h1 className="">
        Recipe Sharing Platform
      </h1>
      
      <div className="">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className=""
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className=""
            />
            <div className="p-4">
              <h2 className="">
                {recipe.title}
              </h2>
              <p className="">
                {recipe.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
