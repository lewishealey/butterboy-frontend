import React, { useState } from 'react'

const AddressBox = ({ data, phone = false, type, onChange, postcode = null }) => {
    const inputClasses = "h-14 border-b border-vibrant px-8 bg-cream font-body text-vibrant w-full";
    const [input, setInput] = useState(data);

    const handleOnChange = (event) => {
        const { target } = event || {};
        onChange(target.name, target.value, type)
    };

    return (
        <>
            <div className="flex">
                <input className={inputClasses + " border-r"} placeholder="First name" name="firstName" onChange={handleOnChange} defaultValue={input.firstName} />
                <input className={inputClasses} placeholder="Last name" name="lastName" onChange={handleOnChange} defaultValue={input.lastName} />
            </div>
            <input className={inputClasses} placeholder="Address" name="address1" onChange={handleOnChange} defaultValue={input.address1} />
            <div className='flex'>
                <input className={inputClasses + " border-r"} placeholder="Suburb" name="suburb" onChange={handleOnChange} defaultValue={input.suburb} />
                <input className={inputClasses + " border-r"} placeholder="City" name="city" onChange={handleOnChange} defaultValue={input.city} />
            </div>
            <div className="flex">
                <input className={inputClasses + " border-r"} placeholder="State" name="state" onChange={handleOnChange} defaultValue={input.state} />
                {postcode ? <input className={inputClasses} placeholder="Postcode" name="postcode" defaultValue={postcode} disabled /> : <input className={inputClasses} placeholder="Postcode" name="postcode" onChange={handleOnChange} defaultValue={input.postcode} />}
            </div>
            {postcode ? <input className={inputClasses + " cursor-not-allowed"} defaultValue={input.country} name="country" placeholder="Country" disabled={postcode} /> : <input className={inputClasses} onChange={handleOnChange} defaultValue={input.country} placeholder="Country" name="country" />}
        </>
    )
}

export default AddressBox;