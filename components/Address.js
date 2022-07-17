import React from 'react'

const Address = () => {
    return (
        <div className='flex flex-col border-none md:border border-vibrant'>
            <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-16 border-b border-vibrant">Contact</h2>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='flex-1 p-6 md:p-24'>
                    <img src="butterboy.png" className=''/>
                </div>
                <div className='flex-1 flex justify-start items-center flex-col text-left border-l border-vibrant'>
                    <div className='text-left space-y-4 w-full'>
                        <figure className='space-y-2 border-b border-vibrant'>
                            <h3 className='font-display uppercase text-3xl md:text-6xl text-mauve border-b border-vibrant p-6'>Location</h3>
                            <p className='font-body text-vibrant text-xl p-6'>74-78 The Corso Manly Sydney Australia</p>
                        </figure>
                        <figure className='space-y-2'>
                            <h3 className='font-display uppercase text-3xl md:text-6xl text-mauve border-b border-vibrant p-6'>BAKING HOURS</h3>
                            <div className='p-6 space-y-2'>
                                <p className='font-body text-vibrant text-xl'>Everyday 9:00am - 6:00pm</p>
                                <p className='font-body text-vibrant text-xl'>Order before 8pm for next day pick up <br />We need 12hrs to process your order.</p>
                            </div>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Address;