import React from 'react'
import { useSelector } from 'react-redux'

import { FaUser } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const Profile = () => {
    const {user} = useSelector(state => state.auth);
    const {email, name, username, photoURL} = user;

  return (
    <div className='w-full h-full flex flex-col gap-2 px-2 py-2'>
        <div className='flex items-center gap-3 py-2'>
            <div>
                <FaUser />
            </div>
            <div className='flex-col'>
                <p className='text-xs leading-1 text-text-muted'>Name</p>
                <p className='text-lg'>{name}</p>
            </div>
        </div>
        <div className='flex items-center gap-3 py-2'>
            <div>
                <FaUser />
            </div>
            <div className='flex-col'>
                <p className='text-xs leading-1 text-text-muted'>User name</p>
                <p className='text-lg'>{username}</p>
            </div>
        </div>
        <div className='flex items-center gap-3 py-2'>
            <div>
                <IoMdMail />
            </div>
            <div className='flex-col'>
                <p className='text-xs leading-1 text-text-muted'>Email</p>
                <p className='text-lg'>{email}</p>
            </div>
        </div>
      
    </div>
  )
}

export default Profile
