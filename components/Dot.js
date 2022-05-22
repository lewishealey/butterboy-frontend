import React from 'react'

const Dot = ({ checked }) => {
    return (
        <div className={`flex rounded-full h-4 w-4 border border-gray-400 ${checked && "bg-blue-600"}`}>
            &nbsp;
        </div>
    )
}

export default Dot;