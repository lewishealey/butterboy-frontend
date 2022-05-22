import React, { useState } from 'react'

const AddressBox = ({ data, phone = false, type, onChange, postcode = null }) => {
    const inputClasses = "h-11 border border-gray-300 px-3 rounded";
    const [input, setInput] = useState(data);

    const handleOnChange = (event) => {
        const { target } = event || {};
        onChange(target.name, target.value, type)
    };

    return (
        <>
            <div className="flex space-x-2">
                <input className={inputClasses} placeholder="First name" name="firstName" onChange={handleOnChange} defaultValue={input.firstName} />
                <input className={inputClasses} placeholder="Last name" name="lastName" onChange={handleOnChange} defaultValue={input.lastName} />
            </div>
            <input className={inputClasses} placeholder="Address" name="address1" onChange={handleOnChange} defaultValue={input.address1} />
            <input className={inputClasses} placeholder="Apartment, suite, etc (optional)" name="address2" onChange={handleOnChange} defaultValue={input.address2} />
            <div className="flex space-x-2">
                <input className={inputClasses} placeholder="Suburb" name="suburb" onChange={handleOnChange} defaultValue={input.suburb} />
                <input className={inputClasses} placeholder="State" name="state" onChange={handleOnChange} defaultValue={input.state} />
                {postcode ? <input className={inputClasses} placeholder="Postcode" name="postcode" defaultValue={postcode} disabled /> : <input className={inputClasses} placeholder="Postcode" name="postcode" onChange={handleOnChange} defaultValue={input.postcode} />}
            </div>
            {postcode ? <input className="h-11 border border-gray-300 px-3 rounded text-gray-500 bg-white cursor-not-allowed" defaultValue={input.country} name="country" disabled={postcode} /> : <input className="h-11 border border-gray-300 px-3 rounded text-gray-500 bg-white cursor-not-allowed" onChange={handleOnChange} defaultValue={input.country} name="country" disabled={postcode} />}
            {phone && <input className={inputClasses} placeholder="Phone (optional)" name="phone" onChange={handleOnChange} defaultValue={input.phone} />}
        </>
    )
}

export default AddressBox;