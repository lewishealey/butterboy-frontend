import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import imageUrlBuilder from "@sanity/image-url"
import client from 'utils/sanity'

const Product = ({ product }) => {

    if(!product) {
        return null;
    }

    function urlFor(source) {
        return imageUrlBuilder(client).image(source);
    }

    return (
        <Link href={`/product/${product.slug.current}`}>
            <a className="border-r border-b border-vibrant hover:bg-gray-100 transition duration-200 ease-linear group">
                <div className="flex justify-center relative w-full h-96 my-6">
                    {product.hover && <div className="absolute top-0 z-10 h-full w-full justify-center flex">
                        <img src={urlFor(product.hover)} className="h-full opacity-0 group-hover:opacity-100" layout="fill"/></div>}
                        {product.thumbnail &&  <img src={urlFor(product.thumbnail)} className="h-full group-hover:opacity-0" layout="fill"/>}
                </div>
                <div className="border-t border-vibrant flex">
                    <span className="uppercase font-body text-3xl text-vibrant border-r border-vibrant p-12">
                        ${product.price}
                    </span>
                        <h2 className="uppercase font-body text-3xl text-vibrant p-12 w-full text-center">{product.title}</h2>
                </div>
            </a>
        </Link>
    )
}

export default Product;