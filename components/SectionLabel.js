import React from 'react'

const SectionLabel = ({children}) => {
    return (
        <div className='flex h-20 border-b border-vibrant px-4 md:px-8 items-center'>
            <h3 className='text-2xl text-vibrant font-bold font-display uppercase'>{children}</h3>
        </div>
    )
}

export default SectionLabel;