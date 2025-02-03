import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FaUser } from "react-icons/fa";

import { setSelectedUser } from '../slices/chatSlice';

const UserTile = ({userData}) => {
  const {uid, name, username, photoURL} = userData;

  const dispatch = useDispatch();
  const {selectedUser} = useSelector(state => state.chat);

  const handleUserSelect = () => {
    dispatch(setSelectedUser(userData));
  }

  return (
    <div className={`flex items-center w-full p-1 border-b-1 border-border/40 ${selectedUser?.uid === uid ? "bg-background-primary" : ""} hover:cursor-pointer`}
      onClick={handleUserSelect}
    >
      <div className='w-10 h-10 rounded-full mr-3 bg-background-primary'>
        {
          photoURL ? (
            <img
            className="w-full h-full object-cover"
            src={photoURL}
            alt="User Image"
            />
          ) : (
            <FaUser className='w-full h-full p-2' />
          )
        }
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg leading-3 font-semibold">{name}</h3>
        <p className="text-sm text-text-muted">@{username}</p>
      </div>
    </div>
  )
}

export default UserTile
