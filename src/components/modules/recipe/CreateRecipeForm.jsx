import { TextInput } from '@mantine/core'
import React from 'react'

export const CreateRecipeForm = () => {
  return (
    <div className='w-[90%] m-auto flex flex-col gap-4'>
        <div className="title ">Create New Recipe</div>
        <div className="form   ">
            <form action="">
                <div className="recipe-title">
                    <TextInput  label="Recipe Title" />
                </div>
                <div className="recipe-image">
                    <TextInput label = "Recipe image" />
                </div>
            </form>
        </div>
    </div>
  )
}
