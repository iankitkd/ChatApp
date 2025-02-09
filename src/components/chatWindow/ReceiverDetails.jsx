import React from 'react'
import { FaRobot, FaUser } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'

const ReceiverDetails = ({selectedUser, closeChatWindow}) => {
  return (
    <div className='bg-background-card flex items-center p-1 border-border/50 border-l-1'>
        { 
          <button className='hover:cursor-pointer hover:-translate-x-1 transform transition duration-300 px-3 text-xl h-full' 
          onClick={closeChatWindow}
          >
            <FaArrowLeftLong />
          </button>
        }
        <div className='w-12 h-12 rounded-full mr-4 bg-background-primary'>
          {
            selectedUser.photoURL ? (
              <img
              className="w-full h-full object-cover"
              src={selectedUser.photoURL}
              alt="User Image"
              />
            ) : selectedUser.uid === "ai" ? (
              <FaRobot className='w-full h-full p-2' />
            ) : (
              <FaUser className='w-full h-full p-2' />
            )
          }
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl leading-5 font-medium">{selectedUser.name}</h3>
          <p className="text-sm text-text-muted">{selectedUser.username ? `@${selectedUser.username}` : ""}</p>
        </div>
    </div>
  )
}

export default ReceiverDetails
