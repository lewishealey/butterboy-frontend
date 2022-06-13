import React from 'react'

const Dot = ({ checked }) => {
    return (
        <div className={`flex rounded-full h-4 w-4 border border-vibrant ${checked && "bg-vibrant"}`}>
            &nbsp;
        </div>
    )
}

export default Dot;