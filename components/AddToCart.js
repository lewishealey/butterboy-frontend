import React from 'react'
import Image from 'next/image'
import { useState } from 'react';

const AddToCart = ({ onSelect, children }) => {
    const [quantity, setQuantity] = useState(1);
    const buttonClasses = "flex-1 text-xl text-white text-center py-2";

    return (
        <div className="relative">
            {children}
            <div className='w-full py-4 px-2 justify-center flex flex-col'>
                <button className='font-display bg-white text-mauve px-8 py-4 text-2xl' onClick={onSelect}>Add to cart</button>
                <div className='flex border border-white'>
                    <button className={buttonClasses} onClick={() => setQuantity(quantity - 1)}>-</button>
                    <span className={buttonClasses}>{quantity}</span>
                    <button className={buttonClasses} onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default AddToCart;