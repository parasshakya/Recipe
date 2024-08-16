import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/modules/auth/actions';
import { Avatar, Button, FileButton, Modal, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import { setUserProfile } from '../store/modules/user/actions';
import { IconEdit } from '@tabler/icons-react';
import { PutRequest } from '../plugins/https';
import { useDisclosure } from '@mantine/hooks';
import toast from 'react-hot-toast';

export const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.userReducer.profile);

    const [name, setName] = useState(user?.username || "");
    const [nameModalOpened, { open: openNameModal, close: closeNameModal }] = useDisclosure(false);
    const [imageModalOpened, { open: openImageModal, close: closeImageModal }] = useDisclosure(false);
    const resetRef = useRef(null);
    const [logoutLoading, setLogoutLoading] = useState(false);

   
  

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
        setLogoutLoading(true);
        localStorage.clear();
        dispatch(setToken(""));
        dispatch(setUserProfile(null));
        setLogoutLoading(false);
        toast.success("Logout Successful")


        navigate("/");
    };

 

    return (
        <div className="mt-7 md:mt-8 xl:mt-10 flex flex-col mb-8 gap-6 w-[90%] mx-auto items-center sm:text-lg md:text-[20px]">
            <div className="user-details flex flex-col gap-6   items-center border border-black rounded-md p-5 bg-gray-50 md:p-6 lg:p-7 xl:p-9">
                <div className="name-section flex   w-full items-center">
              <div className='flex flex-grow gap-2'>
              <div className="label  font-bold">Username:</div>
              <div className="value ">{user.username}</div>
              </div>
                    <div className='bg-red-500 hover:bg-red-700 cursor-pointer  p-1 rounded-md' onClick={openNameModal} >
                    <IconEdit className=" w-5 sm:w-full  " color='white' />
                    
                    </div>
                </div>
                <div className="image-section w-full flex gap-2 items-center">
                    <div className="label font-bold">Image:</div>
                   <div className='   flex flex-col gap-3'>
                   <Avatar src={`http://localhost:3002/uploads/${user.image}`} className="w-40 h-40  sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-56 lg:h-56 2xl:w-64 2xl:h-64" alt="profile picture" />
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
