import React from 'react'

export const Pagination = ({totalPosts, postsPerPage, paginate, currentPage}) => {

    const pageNumbers = [];

    for(let i = 1 ;  i <= Math.ceil(totalPosts/postsPerPage); i++){

        pageNumbers.push(i);

    }

  return (
    <div className='flex gap-4'>
        {
            pageNumbers.map((pageNumber)=>{
                return(
                    <div onClick={
                       ()=>{
                        paginate(pageNumber)
                       }
                    } href="#"  className= {`border  border-black cursor-pointer p-3 ${currentPage == pageNumber ? 'bg-red-500 text-white' : ''}`}> {pageNumber} </div>
                )
            })
        }
    </div>
  )
}
