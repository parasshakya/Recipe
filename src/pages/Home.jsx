import React from 'react'
import {Hero} from "../components/modules/hero/Hero"
import { ExploreRecipes } from '../components/modules/explore_recipes/ExploreRecipes'
import { Blog } from '../components/modules/blog/Blog'
import { Categories } from '../components/modules/categories/Categories'

export const Home = () => {
  return (
    <div>
        {<Hero/>}
        {<ExploreRecipes/>}
        {<Blog/>}
        {<Categories/>}

      
    </div>
  )
}
