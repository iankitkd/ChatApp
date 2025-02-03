import React, { useCallback, useState } from 'react'

import { FaArrowLeftLong } from "react-icons/fa6";

import { findUsersByUsername } from '../services/userService';
import debounce from '../utils/debounce';
import UserTile from './UserTile';

const SearchWindow = ({closeWindow}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  const findUser = async (value) => {
    try {
      if(value) {
        const response = await findUsersByUsername(value);
        console.log(response)
        if(response?.length > 0) {
          setSearchResult(response);
        }
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.log("Error finding user", error);
    }
  }
  const debounceSearch = debounce(findUser, 500);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debounceSearch(value);
  }, [])

  return (
    <div className='absolute inset-0 z-20 w-full h-full bg-background-card/100'>
      <div className='flex gap-3 px-3 py-1 shadow-xs text-lg'>
        <button className='hover:cursor-pointer hover:-translate-x-1 transform transition duration-300' 
        onClick={closeWindow}
        >
          <FaArrowLeftLong/>
        </button>

        <input 
        type="text"
        name="searchQuery"
        value={searchQuery}
        placeholder='Search User'
        onChange={handleSearch}
        autoFocus
        className='w-full outline-0'
        />
      </div>

      <div className='flex flex-col'>
        {
          searchResult?.length > 0 && searchResult.map((userData) => (
            <UserTile key={userData.uid} userData={userData} />
          ))
        }
      </div>
    </div>
  )
}

export default SearchWindow
