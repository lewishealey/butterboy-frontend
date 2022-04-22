import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Product = ({ product }) => {

    console.log(product);
    if(!product) {
        return null;
    }

    return (
        <Link href={`/product/${product.slug}`}>
            <a className="border-r border-vibrant hover:bg-gray-100 transition duration-200 ease-linear">
                <div className="flex justify-center">{product.images && product.images[0].src &&  <Image src={product.images[0].src} width={600} height={500} />}</div>
                <div className="border-t border-vibrant flex">
                    <span className="uppercase font-body text-3xl text-vibrant border-r border-vibrant p-12">
                        ${product.price}
                    </span>
                        <h2 className="uppercase font-body text-3xl text-vibrant p-12 w-full text-center">{product.name}</h2>
                </div>
            </a>
        </Link>
    )
}

export default Product;