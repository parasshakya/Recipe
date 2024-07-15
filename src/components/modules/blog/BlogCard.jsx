import React from 'react'

export const BlogCard = ({blog}) => {
  return (
    <div className= 'border-gray-300 border-2 mx-auto w-full   p-4 rounded-md  flex flex-col gap-4' >
    <div >
        <img src= {`${blog.image}`} className='h-32 sm:h-36   md:h-44 lg:h-56 xl:h-60 2xl:h-64  w-full' alt="" />
    </div>

<div className='sm:text-xl '>
{blog.title}
</div>

<div className="  text-gray-600 line-clamp-2">
{blog.description}

</div>


</div>
  )
}
