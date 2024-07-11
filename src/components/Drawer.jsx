import React, { useEffect } from 'react'

export const Drawer = ({isOpen, onClose}) => {

 
  return (
    <div id='drawer' className={`drawer pt-7 ${isOpen ? "open" : ""} `}>
                    <div onClick={onClose} className='close-btn self-end px-6 py-4'>X</div>

            <div className="nav-items flex flex-col justify-center flex-grow gap-16 items-center">


            <div className="nav-item">Home</div>
            <div className="nav-item">Recipes</div>
            <div className="nav-item">Add Recipe</div>
            <div className="nav-item">About us</div>

            </div>
            
 

    </div>
  )
}
