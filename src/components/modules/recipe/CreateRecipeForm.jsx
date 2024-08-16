import { Button, Select, Textarea, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { GetRequest, PostRequest } from '../../../plugins/https'
import { IconTrash } from '@tabler/icons-react'
import toast from 'react-hot-toast'


export const CreateRecipeForm = () => {

    const initialRecipeState = {
         name:'',
        image: null,
        description: '',
        ingredients: [''],
        instructions: [''],
        preparingTimeInHours: 0,
        preparingTimeInMinutes: 0,
        preparingTimeInSeconds: 0,
        cookingTimeInHours: 0,
        cookingTimeInMinutes: 0,
        cookingTimeInSeconds: 0,     
           cuisine: "",
        category : ""}
    


    const [recipe, setRecipe] = useState(initialRecipeState)


    const [cuisines, setCuisines] = useState([""])
    const [categories, setCategories] = useState([""])

    const getCuisines = async () =>{
        const res = await GetRequest("cuisines");
        setCuisines(res.data.map(cuisine => ({ value: cuisine._id, label: cuisine.name })));
    }

    const getCategories = async () =>{
        const res = await GetRequest("categories")
        setCategories(res.data.map(category => ({ value: category._id, label: category.name })));
    }



    const [errors, setErrors] = useState({})

    const[imagePreview, setImagePreview] = useState(null)


    useEffect(()=>{
        getCuisines();
        getCategories();
    }, [])

    const convertToFormData = (obj) => {
        const formData = new FormData();
        for (const key in obj) {
          if (Array.isArray(obj[key])) {
            obj[key].forEach((value, index) => {
              formData.append(`${key}[${index}]`, value);
            });
          } else {
            formData.append(key, obj[key]);
          }
        }
        return formData;
      };
    

    const handleImageChange = (event) => {


        const file = event.target.files[0];
        if(file){

            setRecipe({...recipe, image: file})
            setImagePreview(URL.createObjectURL(file))

    

        }






    }


const handleInput = (event) =>{

    setRecipe({
        ...recipe,
        [event.target.name] : event.target.value
    })

}





const handleIngredientChange = (event, index) =>{
    const ingredients = [...recipe.ingredients]
    ingredients[index] = event.target.value
    setRecipe({...recipe,
        ingredients: ingredients
    })

    
}

const handleInstructionChange = (event , index) => {
    const instructions = [...recipe.instructions]
    instructions[index] = event.target.value
    setRecipe({
        ...recipe,
        instructions: instructions
    })
}


const addIngredient = () => {
    setRecipe({
        ...recipe,
        ingredients: [...recipe.ingredients, '']
    })
}
    

const addInstruction = () => {
    setRecipe({
        ...recipe,
        instructions: [...recipe.instructions, '']
    })
}
    
const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((value ,position) => position !== index)

    setRecipe({
        ...recipe,
        ingredients: newIngredients
    })



}

const removeInstruction = (index) => {
    const newInstructions = recipe.instructions.filter((value ,position) => position !== index)

    setRecipe({
        ...recipe,
        instructions: newInstructions
    })



}

const validate = () =>{
    const newErrors = {};

    if(!recipe.name.trim()){
        newErrors.name = "Recipe Name is required"
    }

    if(!recipe.description.trim()){
        newErrors.description = "Recipe Description is required"
    }

    if(!recipe.image){
        newErrors.image = "Recipe image is required"

    }
    if (
        recipe.preparingTimeInHours === 0 &&
        recipe.preparingTimeInMinutes === 0 &&
        recipe.preparingTimeInSeconds === 0
      ) {
        newErrors.preparingTime = "Preparing time is required";
      }
    
      if (
        recipe.cookingTimeInHours === 0 &&
        recipe.cookingTimeInMinutes === 0 &&
        recipe.cookingTimeInSeconds === 0
      ) {
        newErrors.cookingTime = "Cooking time is required";
      }
    
    if(!recipe.cuisine.trim()){
        newErrors.cuisine = "Please select a cuisine"
    }
    if(!recipe.category.trim()){
        newErrors.category = "Please select a category"
    }
    if(recipe.ingredients.some((value, index) => !value.trim())){
        newErrors.ingredients = "Please fill all the ingredients"
    }

    if(recipe.instructions.some((value, index) => !value.trim())){
        newErrors.instructions = "Please fill all the instructions"
    }
  
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
}


const handleSubmit = async (event) =>{
    event.preventDefault();

    if(!validate()){
        return;
    }

      // Ensure empty time inputs are converted to zero before submitting
  const preparedRecipe = {
    ...recipe,
    preparingTimeInHours: recipe.preparingTimeInHours || 0,
    preparingTimeInMinutes: recipe.preparingTimeInMinutes || 0,
    preparingTimeInSeconds: recipe.preparingTimeInSeconds || 0,
    cookingTimeInHours: recipe.cookingTimeInHours || 0,
    cookingTimeInMinutes: recipe.cookingTimeInMinutes || 0,
    cookingTimeInSeconds: recipe.cookingTimeInSeconds || 0,
  };



    const formData = convertToFormData(preparedRecipe)

    const res = await PostRequest("/recipes", formData)

    setRecipe(initialRecipeState)
    resetImage();
    setImagePreview(null)


    if(res.status == 200){
        toast.success("Recipe created successfully");

    }else{
        toast.error("Cannot create recipe, something went wrong. Please try again later.");
    }


}

const resetImage = () =>{
    const image = document.getElementById("recipe-image")
    image.value = '';

}


  return (
    <div className='w-[90%] m-auto flex flex-col gap-4'>
        <div className="title ">Create New Recipe</div>
        <div className="form   ">
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className="recipe-title">
                    <div className="title">Recipe Name</div>
                    <TextInput error= {errors.name} name='name' placeholder='Enter name' value={recipe.name}   onChange={handleInput} />
                </div>
                <div className="recipe-image">
                    <div className="title">Recipe Image</div>
                    <div className="image-input">
                    <input name='image' id='recipe-image'  type="file"  accept="image/*" onChange={handleImageChange} />
                    </div>
                    <div className="image-preview mt-4">
                        <img className='w-72' src= {imagePreview} alt="" />
                    </div>
                    {errors.image && <div className="error-message mt-2 text-red-500 text-xs">{errors.image}</div>}


                </div>
                <div className="description">
                    <div className="title">Description</div>
                    <Textarea error={errors.description} name='description' value={recipe.description} onChange={handleInput}  placeholder='Enter Description'/>
                
                </div>
                <div className="ingredients flex flex-col gap-4">
                    <div className="title">Ingredients</div>
                    <div className="text-fields flex flex-col gap-4">
                     {
                        recipe.ingredients.map((value, index) => {
                            return(
                                <TextInput name= {value}   rightSection={ index === 0 ? null : <IconTrash onClick={(e) =>{
                                    removeIngredient(index)
                                }}/>}
                                placeholder= {`Ingredient ${index + 1}`} key={index} value={value} onChange={(e) => {
                                    handleIngredientChange(e, index)
                                }} 
                                error={errors.ingredients}

                                />
                            )
                        })
                     }
                    </div>
                    <div className="add">
                       <Button onClick={addIngredient}  >Add</Button>
                    </div>
                </div>
                <div className="instructions flex flex-col gap-4">
                    <div className="title">Instructions</div>
                    <div className="text-fields flex flex-col gap-4">
                       {
                        recipe.instructions.map((value, index) => {
                            return(
                                <TextInput name= {value}  error= {errors.instructions} rightSection ={ index === 0 ? null : <IconTrash  onClick={(e) => {
                                    removeInstruction(index)
                                }}/>} key={index} placeholder= {`Instruction ${index + 1}`} value={value} onChange={(e) => {
                                    handleInstructionChange(e, index)
                                }}/>
                            )
                        })
                       }
                    </div>
                    <div className="add">
                        <Button onClick={addInstruction}>Add</Button>
                    </div>
                </div>
                
                <div className="preparing-time">
                    <div className="title">Preparing time</div>
                    <div className="input-fields flex gap-3">
                    <TextInput
      error={errors.preparingTime}
      value={recipe.preparingTimeInHours}
      name="preparingTimeInHours"
      onChange={handleInput}
      rightSection = {"hr"}
    />
    <TextInput
      error={errors.preparingTime}
      value={recipe.preparingTimeInMinutes}
      name="preparingTimeInMinutes"
      onChange={handleInput}
      rightSection = {"min"}
    />
    <TextInput
      error={errors.preparingTime}
      value={recipe.preparingTimeInSeconds}
      name="preparingTimeInSeconds"
      onChange={handleInput}
      rightSection = {"sec"}
    />
                                
                    </div>
                </div>
                
                <div className="cooking-time">
                    <div className="title">Cooking time</div>
                    <div className="input-fields flex gap-3">
                    <TextInput
      error={errors.cookingTime}
      value={recipe.cookingTimeInHours}
      name="cookingTimeInHours"
      onChange={handleInput}
      rightSection = {"hr"}

    />
    <TextInput
      error={errors.cookingTime}
      value={recipe.cookingTimeInMinutes}
      name="cookingTimeInMinutes"
      onChange={handleInput}
      rightSection = {"min"}

    />
    <TextInput
      error={errors.cookingTime}
      value={recipe.cookingTimeInSeconds}
      name="cookingTimeInSeconds"
      onChange={handleInput}
      rightSection = {"sec"}

    />                    </div>
                </div>
                <div className="cuisine">
                    <div className="title">Cuisine</div>
                    <div className="dropdown">
                    <Select
              placeholder="Select Cuisine"
              data={cuisines}
              value={recipe.cuisine ? recipe.cuisine : null}
            
              error = {errors.cuisine}
              name="cuisine"
              onChange={(value) => setRecipe({ ...recipe, cuisine: value })}
            />
                    </div>
                </div>
                <div className="category">
                    <div className="title">Category</div>
                    <div className="dropdown">
                    <Select
              placeholder="Select Category"
              error= {errors.category}
              data={categories}
              name="category"
              value={recipe.category ? recipe.category : null}
              onChange={(value) => setRecipe({ ...recipe, category: value })}
            />
                    </div>
                </div>
                <div className="submit">
                    <Button type='submit'>Submit</Button>
                </div>

                
            </form>
        </div>
    </div>
  )
}
