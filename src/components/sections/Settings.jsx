import React from 'react'
import useTheme from '../../hooks/useTheme'

const Settings = () => {
    const {theme, toggleTheme} = useTheme();

  return (
    <div className='text-xl font-medium'>
      <div className='flex justify-between p-3'>
        <h3>Dark Mode</h3>
        <div className="cursor-pointer flex items-center w-14 h-7 bg-background-fill rounded-full relative transition-colors duration-300"
            onClick={toggleTheme}
        >
            <div className={`w-7 h-7 rounded-full absolute transition-all duration-300 transform 
                ${theme === 'dark' ? 'translate-x-7 bg-button' : 'translate-x-0 bg-background-card'}`}
            />
        </div>
      </div>
    </div>
  )
}

export default Settings
