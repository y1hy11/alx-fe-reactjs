import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddRecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        image: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        if (!formData.title.trim()) {
            newErrors.title = 'Recipe title is required';
        }

        if (!formData.summary.trim()) {
            newErrors.summary = 'Recipe summary is required';
        }

        if (!formData.ingredients.trim()) {
            newErrors.ingredients = 'Ingredients are required';
        } else {
            // Check if ingredients list has at least 2 items (split by newline or comma)
            const ingredientsList = formData.ingredients.split(/\n|,/).filter(item => item.trim());
            if (ingredientsList.length < 2) {
                newErrors.ingredients = 'Please provide at least 2 ingredients';
            }
        }

        if (!formData.instructions.trim()) {
            newErrors.instructions = 'Preparation steps are required';
        } else {
            // Check if instructions have at least 2 steps
            const instructionsList = formData.instructions.split('\n').filter(step => step.trim());
            if (instructionsList.length < 2) {
                newErrors.instructions = 'Please provide at least 2 preparation steps';
            }
        }

        if (!formData.image.trim()) {
            newErrors.image = 'Recipe image URL is required';
        } else {
            // Basic URL validation
            const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            if (!urlPattern.test(formData.image)) {
                newErrors.image = 'Please provide a valid image URL';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate API call (as per original task requirements)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Process the form data for display/logging
            const processedRecipe = {
                title: formData.title.trim(),
                summary: formData.summary.trim(),
                image: formData.image.trim(),
                prepTime: formData.prepTime.trim() || undefined,
                cookTime: formData.cookTime.trim() || undefined,
                servings: formData.servings.trim() || undefined,
                ingredients: formData.ingredients.split('\n').filter(item => item.trim()).map(item => item.trim()),
                instructions: formData.instructions.split('\n').filter(step => step.trim()).map(step => step.trim())
            };
            
            console.log('Recipe submitted:', processedRecipe);
            setSubmitSuccess(true);
            
            // Reset form after successful submission
            setFormData({
                title: '',
                summary: '',
                ingredients: '',
                instructions: '',
                prepTime: '',
                cookTime: '',
                servings: '',
                image: ''
            });
            
            // Hide success message after 3 seconds
            setTimeout(() => setSubmitSuccess(false), 3000);
            
        } catch (error) {
            console.error('Error submitting recipe:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-4xl">
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

                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#4B5563] mb-4">
                        Add New Recipe
                    </h1>
                    <p className="text-lg text-[#4B5563]">
                        Share your delicious recipe with the community
                    </p>
                </div>

                {submitSuccess && (
                    <div className="mb-6 p-4 border border-[#4B5563] rounded-[8px]">
                        <div className="flex items-center">
                            <svg className="w-[20px] h-[20px] mr-[8px]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Recipe submitted successfully!
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="rounded-[8px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] p-[30px] m-[40px] md:p-[32px]">
                    <div className="grid md:grid-cols-2 gap-[24px]">
                        <div className="md:col-span-2">
                            <label htmlFor="title" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Recipe Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className={`w-full h-[40px] p-[5px] border rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.title ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Enter recipe title"
                            />
                            {errors.title && <p className="mt-1 text-[16px] text-[#ff0000]">{errors.title}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="summary" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Recipe Summary *
                            </label>
                            <textarea
                                id="summary"
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full max-w-[1220px] h-auto max-h-[90px] px-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                                    errors.summary ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Brief description of your recipe"
                            />
                            {errors.summary && <p className="mt-1 text-[16px] text-[#ff0000]">{errors.summary}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="image" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Recipe Image URL *
                            </label>
                            <input
                                type="url"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className={`w-full h-[40px] px-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.image ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="https://example.com/recipe-image.jpg"
                            />
                            {errors.image && <p className="mt-1 text-[16px] text-[#ff0000]">{errors.image}</p>}
                        </div>

                        <div>
                            <label htmlFor="prepTime" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Prep Time
                            </label>
                            <input
                                type="text"
                                id="prepTime"
                                name="prepTime"
                                value={formData.prepTime}
                                onChange={handleChange}
                                className="w-full h-[40px] px-4 py-3 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="e.g., 15 minutes"
                            />
                        </div>

                        <div>
                            <label htmlFor="cookTime" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Cook Time
                            </label>
                            <input
                                type="text"
                                id="cookTime"
                                name="cookTime"
                                value={formData.cookTime}
                                onChange={handleChange}
                                className="w-full h-[40px] px-4 py-3 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="e.g., 30 minutes"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="servings" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Servings
                            </label>
                            <input
                                type="text"
                                id="servings"
                                name="servings"
                                value={formData.servings}
                                onChange={handleChange}
                                className="w-full h-[40px] px-4 py-3 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="e.g., 4 people"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="ingredients" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Ingredients * <span className="text-gray-500 font-normal">(Enter each ingredient on a new line)</span>
                            </label>
                            <textarea
                                id="ingredients"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                                rows="6"
                                className={`w-full h-auto max-h-[90px] px-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                                    errors.ingredients ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="400g spaghetti&#10;200g pancetta or bacon, diced&#10;4 large eggs&#10;100g Parmesan cheese, grated"
                            />
                            {errors.ingredients && <p className="mt-1 text-[16px] text-[#ff0000]">{errors.ingredients}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="instructions" className="block text-[18px] font-bold text-[#4B5563] mb-[8px]">
                                Preparation Steps * <span className="text-gray-500 font-normal">(Enter each step on a new line)</span>
                            </label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                rows="8"
                                className={`w-full h-auto max-h-[90px] px-4 py-3 border rounded-[8px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                                    errors.instructions ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Bring a large pot of salted water to boil and cook spaghetti according to package directions.&#10;While pasta cooks, heat olive oil in a large skillet over medium heat.&#10;Add pancetta and cook until crispy, about 5-7 minutes."
                            />
                            {errors.instructions && <p className="mt-1 text-[16px] text-[#ff0000]">{errors.instructions}</p>}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-[200px] h-[40px] mt-[12px] p-[12px 16px] rounded-[4px] text-[16px] font-[600] transition-all duration-300 ${
                                isSubmitting
                                    ? 'bg-[#D1D5DB] cursor-not-allowed'
                                    : 'bg-[transparent] hover:bg-[#4B5563] hover:scale-105'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting Recipe...
                                </div>
                            ) : (
                                'Submit Recipe'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeForm;
