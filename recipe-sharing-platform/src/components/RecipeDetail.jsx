import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch('/src/data.json');
                const data = await response.json();
                const foundRecipe = data.find(recipe => recipe.id === parseInt(id));
                setRecipe(foundRecipe);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-center">
                    <div className="text-xl text-[#4B5563]">Loading recipe...</div>
                </div>
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-center">
                    <div className="text-[40px] mb-[6px]">😞</div>
                    <div className="text-[28px] text-[#4B5563] mb-4">Recipe not found</div>
                    <Link 
                        to="/" 
                        className="hover:text-[#4B5563] underline"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="p-[8px]">
                <div className="m-[10px]">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-[#4B5563] hover:scale-105 duration-300"
                    >
                        <svg className="w-[24px] h-[24px] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Recipes
                    </Link>
                </div>

                <div>
                    <h1 className="text-center text-[32px] md:text-[40px] font-bold text-[#4B5563] mb-4">
                        {recipe.title}
                    </h1>
                    <p className="text-center text-[16px] text-[#4B5563] leading-relaxed mb-[16px]">
                        {recipe.summary}
                        </p>
                    <div className="flex justify-center">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-[1000px] h-[600px] md:h-96 object-cover rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                        />
                    </div>

                        {(recipe.prepTime || recipe.cookTime || recipe.servings) && (
                            <div className="flex justify-center gap-[50px] p-[20px]">
                                {recipe.prepTime && (
                                    <div className="text-center">
                                        <div className="text-[24px] mb-[5px]">⏱️</div>
                                        <h3 className="font-semibold text-[#4B5563] text-sm">Prep Time</h3>
                                        <p className="text-[#4B5563] text-[17px]">{recipe.prepTime}</p>
                                    </div>
                                )}
                                {recipe.cookTime && (
                                    <div className="text-center">
                                        <div className="text-[24px] mb-[5px]">🔥</div>
                                        <h3 className="font-semibold text-[#4B5563] text-sm">Cook Time</h3>
                                        <p className="text-[#4B5563] text-[17px]">{recipe.cookTime}</p>
                                    </div>
                                )}
                                {recipe.servings && (
                                    <div className="text-center">
                                        <div className="text-[24px] mb-[5px]">👥</div>
                                        <h3 className="font-semibold text-[#4B5563] text-sm">Servings</h3>
                                        <p className="text-[#4B5563] text-[17px]">{recipe.servings}</p>
                                    </div>
                                )}
                            </div>
                        )}
                </div>

                <div className="flex justify-between p-[16px] sm:flex-col ">
                    <div className="p-6 md:p-8 h-fit">
                        <div className="flex items-center mb-[6px]">
                            <div className="text-[24px] mr-[8px]">🛒</div>
                            <h2 className="text-[25px] font-semibold text-[#4B5563]">
                                Ingredients
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {recipe.ingredients?.map((ingredient, index) => (
                                <div key={index} className="flex items-start pb-[6px] text-[17px]">
                                    <span className="mr-[6px]">-</span>
                                    <span className="text-[#4B5563] leading-relaxed">{ingredient}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 md:p-8 h-fit">
                        <div className="flex items-center mb-[6px]">
                            <div className="text-[24px] mr-[8px]">👨‍🍳</div>
                            <h2 className="text-[25px] font-semibold text-[#4B5563]">
                                Instructions
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {recipe.instructions?.map((instruction, index) => (
                                <div key={index} className="flex items-start p-[6px] text-[17px]">
                                    <span className="mr-[6px]">
                                        {index + 1} -
                                    </span>
                                    <span className="text-[#4B5563]">{instruction}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-[#E5E7EB] text-center">
                    <div className="mb-[6px]">
                        <h3 className="text-[28px] font-semibold text-[#4B5563]">
                            Pro Tips
                        </h3>
                    </div>
                    <div className="text-[#4B5563]">
                        <p>• For best results, use high-quality ingredients •</p>
                        <p>• Taste and adjust seasoning as needed •</p>
                        <p>• Don't rush the cooking process - good food takes time! •</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;