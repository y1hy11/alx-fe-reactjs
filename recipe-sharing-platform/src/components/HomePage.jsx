import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recipeData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-[48px]">
                    <h1 className="text-[32px] md:text-[40px] font-bold text-[#4B5563] mb-[16px]">
                        Recipe Sharing Platform
                    </h1>
                    <p className="text-[18px] text-[#4B5563] max-w-2xl mx-auto mb-6">
                        Discover delicious recipes from around the world and share your
                        culinary creations
                    </p>
                    <Link 
                        to="/add-recipe"
                        className="inline-flex items-center text-[#4B5563] font-semibold hover:scale-105 transition-all duration-300 shadow-md"
                    >
                        <svg className="w-[25px] h-[25px] mr-[8px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New Recipe
                    </Link>
                </div>

                <div className="grid grid-cols-2 grid-cols-3 gap-[24px] justify-items-center p-[20px] sm:p-[40px] sm:max-w-[800px] mx-auto sm:grid-cols-1">
                    {recipes.map((recipe) => (
                        <Link 
                            key={recipe.id}
                            to={`/recipe/${recipe.id}`}
                            className="bg-[#ffffff] rounded-[8px] shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out w-full  block"
                        >
                            <div className="h-[200px] overflow-hidden">
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.title}
                                    className="w-full h-[200px] object-cover"
                                />
                            </div>

                            <div className="p-[16px]">
                                <h2 className="text-[20px] font-semibold text-[#4B5563] mb-[8px]">
                                    {recipe.title}
                                </h2>
                                <p className="text-[#4B5563] text-[14px] mb-[6px]">
                                    {recipe.summary}
                                </p>
                                <div className="flex justify-between items-center text-[#4B5563] text-[14px] font-medium">
                                    <span>View Recipe</span>
                                    <svg className="w-[50px] h-[20px] ml-[6px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
);
};


export default HomePage;
