import React from 'react'

const ConfirmationModal = ({text1, text2, btn1Handler, btn1Text, btn2Handler, btn2Text, disabled}) => {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/20'>
      <div className='w-[350px] h-fit py-5 flex flex-col rounded-lg shadow-lg bg-background-card border-border'>
        <p className='text-center text-2xl font-semibold'>{text1}</p>
        <p className='text-center py-1'>{text2}</p>

        <div className='w-full flex justify-evenly py-2'>
            <button className='px-5 py-1 rounded-md text-lg font-semibold border-border shadow-md border-1 border-l-2 border-b-2 hover:cursor-pointer' 
            onClick={btn1Handler}
            disabled={disabled}
            >
                {btn1Text}
            </button>

            <button className='px-5 py-1 rounded-md text-lg font-semibold text-button-text bg-button hover:bg-button-hover disabled:bg-button-muted shadow-md hover:cursor-pointer'
            onClick={btn2Handler}
            disabled={disabled}
            >
                {btn2Text}
            </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
