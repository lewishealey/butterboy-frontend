import React from 'react'
import Image from 'next/image'
import { useState } from 'react';

const AddToBox = ({ cookie, onSelect, quantity = 0, children }) => {
    const buttonClasses = "flex-1 text-xl text-vibrant text-center py-2";
    return (
        <div className="relative">
            {children}
            <div className='w-full py-4 px-2 justify-center flex flex-col'>
                {/* {addedToBox ? <button className='font-display bg-vibrant text-white px-8 py-4 text-2xl'>Added to box</button> : <button className='font-display bg-white text-mauve px-8 py-4 text-2xl' onClick={onCookieSelect}>Add to box</button>} */}
                <div className='flex border border-white'>
                    <button className={buttonClasses} onClick={() => onSelect(cookie,-1)}>-</button>
                    <span className={buttonClasses}>{quantity}</span>
                    <button className={buttonClasses} onClick={() => onSelect(cookie,1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default AddToBox;