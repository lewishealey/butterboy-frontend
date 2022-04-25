import React from 'react'
import Image from 'next/image'

const Cookie = ({ cookie, readMore = false }) => {
    return (
        <div className="flex flex-col space-y-1">
            {cookie.acf && cookie.acf.thumbnail &&  <Image src={cookie?.acf?.thumbnail?.url} width={cookie?.acf?.thumbnail?.width} height={cookie?.acf?.thumbnail?.height} />}
           <h2 className="text-vibrant font-body uppercase font-normal text-xl text-center">{cookie.title.rendered}</h2>
           {readMore && <button className="text-vibrant font-body uppercase font-normal text-base text-center underline">Read more</button>}
        </div>
    )
}

export default Cookie;