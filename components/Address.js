import React from 'react'

const Address = () => {
    return (
        <div className='flex'>
            <div className='flex-1'>
                <img src="cookies.png" />
            </div>
            <div className='flex-1 flex justify-center items-center flex-col text-left'>
                <div className='text-left space-y-4'>
                    <figure className='space-y-2'>
                        <h3 className='font-display uppercase text-vibrant text-2xl'>ADDRESS</h3>
                        <p className='font-body text-vibrant text-xl'>74-78 The Corso Manly Sydney Australia</p>
                    </figure>
                    <figure className='space-y-2'>
                        <h3 className='font-display uppercase text-vibrant text-2xl'>BAKING HOURS</h3>
                        <p className='font-body text-vibrant text-xl'>Weekdays 9am-4:30pm <br />Weekends 9am-3pm</p>
                        <p className='font-body text-vibrant text-xl'>Order before 8pm for next day pick up. We need 12hrs to process your order.</p>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default Address;