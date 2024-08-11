import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/modules/auth/actions';
import { Button, FileButton, Modal, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import { setUserProfile } from '../store/modules/user/actions';
import { IconEdit } from '@tabler/icons-react';
import { PutRequest } from '../plugins/https';
import { useDisclosure } from '@mantine/hooks';

export const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer.profile);

    const [name, setName] = useState(user?.username || "");
    const [nameModalOpened, { open: openNameModal, close: closeNameModal }] = useDisclosure(false);
    const [imageModalOpened, { open: openImageModal, close: closeImageModal }] = useDisclosure(false);
    const resetRef = useRef(null);

   
  

    const [file, setFile] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);


   

    const handleNameChange = (event) => {
        setName(event.target.value);

    };

    const clearFile = () => {
      resetRef.current?.();
    };
  

    const updateName = async () => {
        try {
            const res = await PutRequest(`users/${user._id}`, { username: name });
            dispatch(setUserProfile(res.data));
            localStorage.setItem("userData", JSON.stringify(res.data) );
            closeNameModal();
        } catch (error) {
            console.error("Failed to update username", error);
        }
    };

    const updateImage = async () =>{
      const formData = new FormData();
  
        formData.append("image", file);
  
        const res = await PutRequest(`users/${user._id}`, formData );
        dispatch(setUserProfile(res.data));
        localStorage.setItem("userData", JSON.stringify(res.data) );
        closeImageModal();

        setImagePreview(null);
        clearFile();

  
    }

    const handleFileChange =  (file) => {

if(file){
  setFile(file);
  setImagePreview(URL.createObjectURL(file)); // Set the image preview
  openImageModal(); // Open the image modal

}

clearFile();


  };

 
  

    const logout = async () => {
        localStorage.clear();
        dispatch(setToken(""));
        dispatch(setUserProfile(null));
        navigate("/");
    };

 

    return (
        <div className="mt-24 flex flex-col mb-8 gap-14 w-[90%] mx-auto items-center sm:text-lg md:text-[20px]">
            <div className="user-details flex flex-col gap-6   items-center border border-black rounded-md p-5 bg-gray-50 md:p-6 lg:p-7 xl:p-9">
                <div className="name-section flex   w-full items-center">
              <div className='flex flex-grow gap-2'>
              <div className="label  font-bold">Username:</div>
              <div className="value ">{user.username}</div>
              </div>
                    <div className='bg-red-500 hover:bg-red-700  p-1 rounded-md'>
                    <IconEdit className=" cursor-pointer w-5 sm:w-full  " color='white' onClick={openNameModal} />

                    </div>
                </div>
                <div className="image-section w-full flex gap-2 items-center">
                    <div className="label font-bold">Image:</div>
                   <div className='   flex flex-col gap-3'>
                   <img src={`http://localhost:3002/uploads/${user.image}`} className="w-40  sm:w-44 md:w-48 lg:w-56 2xl:w-64" alt="profile picture" />
                  <FileButton resetRef={resetRef} onChange={handleFileChange} accept='image/png,image/jpeg'> 
                            {(props) => <Button className='bg-red-500 hover:bg-red-700' {...props}>Change Image</Button>}
 </FileButton>

                   </div>
               
                </div>
                <div className="email-section w-full flex gap-2">
                    <div className="label font-bold">Email:</div>
                    <div className="value">{user.email}</div>
                </div>
            </div>
            <Button className="w-44" onClick={logout}>
                Logout
            </Button>
       
                <Modal title="Edit Username" opened = {nameModalOpened} centered  onClose={closeNameModal}>
                 <div className= 'flex flex-col gap-4 items-center'>
                 <TextInput value={name} onChange={handleNameChange} className='w-full' placeholder="Enter username" />
                    <Button onClick={updateName} className="mt-4">
                        Submit
                    </Button>
                 </div>
                </Modal>
                <Modal title="Update Image" opened={imageModalOpened} centered onClose={closeImageModal}>
                  <div className= 'flex flex-col gap-4 items-center'>
                  {imagePreview && <img src={imagePreview}  alt="Preview" className="w-full  " />}
                <Button onClick={updateImage}>Submit</Button>

                  </div>
            </Modal>

              
            
        </div>
    );
};
