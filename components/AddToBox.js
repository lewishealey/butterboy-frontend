import React from 'react'
import Image from 'next/image'
import { useState } from 'react';

const AddToBox = ({ cookie, onSelect, children, count, max }) => {
    const [quantity, setQuantity] = useState(0);
    const buttonClasses = "flex-1 text-xl text-white text-center py-2";

    function onQuantitySelect(math) {
        const newNumber = quantity + math;
        const totalCookies = countCookies();
        // Don't go below 0
        if(newNumber >= 0) {

            // If number is under max
            // If count of cookies is equal or under max
            if(newNumber <= max && totalCookies <= max) {
                setQuantity(newNumber);
                console.log(newNumber, totalCookies, max, count <= max)
            }
        }

        onSelect({
            id: cookie.id,
            title: cookie.title.rendered,
            slug: cookie.slug,
            quantity: quantity + math
        });
    }

    function countCookies() {
        let sumCookiesAdded = 0;
        count.forEach(added =>
            sumCookiesAdded = sumCookiesAdded + added.quantity
        )
        return sumCookiesAdded;
    }

    return (
        <div className="relative">
            {children}
            <div className='w-full py-4 px-2 justify-center flex flex-col'>
                {/* {addedToBox ? <button className='font-display bg-vibrant text-white px-8 py-4 text-2xl'>Added to box</button> : <button className='font-display bg-white text-mauve px-8 py-4 text-2xl' onClick={onCookieSelect}>Add to box</button>} */}
                <div className='flex border border-white'>
                    <button className={buttonClasses} onClick={() => onQuantitySelect(-1)}>-</button>
                    <span className={buttonClasses}>{quantity}</span>
                    <button className={buttonClasses} onClick={() => onQuantitySelect(1)}>+</button>
                </div>
            </div>
        </div>
    )
}

export default AddToBox;