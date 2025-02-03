import React from 'react'

import { FaUser } from "react-icons/fa";

const UserTile = ({userData}) => {
  const {name, username, photoURL} = userData;

  return (
    <div className="flex items-center w-full p-1 border-b-1 border-border/40 hover:cursor-pointer">
      <div className='w-12 h-12 rounded-full mr-3 bg-background-primary'>
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
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-text-muted">@{username}</p>
      </div>
    </div>
  )
}

export default UserTile
