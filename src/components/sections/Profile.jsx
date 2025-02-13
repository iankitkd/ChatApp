import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FaUser, FaUserCircle } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { MdOutlineCameraAlt } from "react-icons/md";
import toast from 'react-hot-toast';

import { uploadToCloudinary } from "../../services/mediaService"
import { updateUser } from '../../services/userService';
import { setUser } from '../../slices/authSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {uid, email, name, username, photoURL} = user;

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            toast.error("Invalid file type")
            return;
        }

        const toastId = toast.loading("Updating...");

        const mediaUrl = await uploadToCloudinary(selectedFile);
        await updateUser(uid, {photoURL: mediaUrl});
        dispatch(setUser({...user, photoURL: mediaUrl}));

        toast.dismiss(toastId);
        toast.success("Successfully Updated!");
    };

  return (
    <div className='w-full h-full flex flex-col gap-2 px-4 py-2 text-xl'>
        <div className='py-2 flex justify-center'>
            <div className='relative w-32 h-32 rounded-full shadow-xl'>
                { photoURL ? (
                    <img 
                    src={photoURL} 
                    alt="Profile Photo" 
                    className='w-full h-full rounded-full object-cover'
                    loading='lazy'
                    />
                    ) : (
                        <FaUserCircle className='w-full h-full'/>
                    )
                }
                <label className="absolute bottom-1 right-1 p-2 rounded-full bg-background-fill cursor-pointer">
                    <MdOutlineCameraAlt />
                    <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
        </div>

        <div className='flex items-center gap-3 py-2'>
            <div>
                <FaUser />
            </div>
            <div className='flex-col'>
                <p className='text-xs leading-1 text-text-muted'>Name</p>
                <p className='text-2xl'>{name}</p>
            </div>
        </div>
        <div className='flex items-center gap-3 py-2'>
            <div>
                <FaUser />
            </div>
            <div className='flex-col'>
                <p className='text-xs leading-1 text-text-muted'>User name</p>
                <p className='text-2xl'>{username}</p>
            </div>
        </div>
        <div className='flex items-center gap-3 py-2'>
            <div>
                <IoMdMail />
            </div>
            <div className='flex-col'>
                <p className='text-xs leading-1 text-text-muted'>Email</p>
                <p className='text-2xl'>{email}</p>
            </div>
        </div>
      
    </div>
  )
}

export default Profile
