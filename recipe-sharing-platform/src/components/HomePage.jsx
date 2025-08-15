import { useState, useEffect } from "react";
import recipeData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

return (
        <div >
            <div className="text-center mb-[48px]">
                <h1 className="text-[32px] md:text-[40px] font-bold text-[#4B5563] mb-[16px]">
                    Recipe Sharing Platform
                </h1>
                <p className="text-[18px] text-[#4B5563] max-w-2xl mx-auto">
                    Discover delicious recipes from around the world and share your
                    culinary creations
                </p>
            </div>

            <div className="flex gap-[24px] justify-center">
                {recipes.map((recipe) => (
                    <div 
                        key={recipe.id}
                        className="bg-[#ffffff] rounded-[8px] shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out w-full max-w-[320px]"
                    >
                        <div className="h-[192px] overflow-hidden">
                            <img 
                                src={recipe.image} 
                                alt={recipe.title}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-[16px]">
                            <h2 className="text-[20px] font-semibold text-[#4B5563] mb-[8px] ">
                                {recipe.title}
                            </h2>
                            <p className="text-[#4B5563] text-[14px]">
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
