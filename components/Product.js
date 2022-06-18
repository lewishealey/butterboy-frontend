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
    let padding = "p-2 md:p-16";
    let rotate = ""
    if(product.details.type === "box") {
        padding = "";
    }

    if(product.details.type === "merch") {
        rotate = "hover:rotate-12";
    }

    return (
        <Link href={`/product/${product.slug.current}`}>
            <a className={`border-r border-b border-vibrant transition duration-200 ease-linear group`}>
                <div className={`flex justify-center relative w-full h-32 md:h-96 my-6`}>
                    {product.hover && <div className={`absolute top-0 z-10 h-full w-full justify-center hidden md:flex ${padding}`}>
                        <img src={urlFor(product.hover)} className="h-full opacity-0 group-hover:opacity-100" layout="fill"/></div>}
                        {product.thumbnail &&  <img src={urlFor(product.thumbnail)} className={`h-full ${product.hover && "group-hover:opacity-0"} ${padding} ${rotate}`} layout="fill"/>}
                </div>
                <div className="border-t border-vibrant flex flex-col md:flex-row">
                    <span className="uppercase font-body text-xl md:text-3xl text-vibrant border-t md:border-r border-vibrant p-3 md:p-6 md:p-12 order-1 md:order-0 text-center">
                        ${product.price}
                    </span>
                    <h4 className="uppercase font-body text-xl md:text-3xl text-vibrant p-3 md:p-6 md:p-12 w-full text-center order-0 md:order-1">{product.title}</h4>
                </div>
            </a>
        </Link>
    )
}

export default Product;