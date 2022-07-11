import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { getSlugs, getProduct, getCookies } from 'utils/wordpress';
import Page from "components/Page";
import Cookie from 'components/Cookie';
import AddToBox from 'components/AddToBox';
import { useCart } from 'contexts/cart-context';
import client from 'utils/sanity';
import { urlFor } from "helpers/sanity";

Modal.setAppElement('#__next');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: "80%",
        maxHeight: "80%",
        background: "#DCC9E8",
        padding: "0",
        overflowX: "auto"
    },
};

export default function SingleProduct({ product, cookies }) {

    const router = useRouter();
    const [cookiesObject, setCookiesObject] = useState(cookies);
    const { addProduct } = useCart();
    const [count, setCount] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const buttonClasses = "flex-1 text-xl text-vibrant text-center py-2";

    function renderCookieString(cookies) {
        let cook = [];
        cookies.forEach(c => cook.push(`${c.quantity} X ${c.title}`));
        return cook.join(", ")
    }

    function addCookieToCart(cookie, math) {

        let newCookie = cookiesObject.find((c) => c._id === cookie._id);
        if (newCookie.quantity) {
            newCookie.quantity += math;
        } else {
            newCookie.quantity = 1;
        }

        const updatedCookies = cookiesObject.map(c => {
            if (newCookie._id === c._id) return newCookie;
            return c;
        });

        let count = 0;
        updatedCookies.forEach(c => {
            if (c.quantity) { count = count + c.quantity; }
        });

        setCount(count);
        setCookiesObject(updatedCookies);
    }

    if (!product) {
        return null;
    }

    function handleCart() {
        const addedCookies = cookiesObject.filter(c => c.quantity > 0);

        let changedCookies = []
        addedCookies && addedCookies.forEach(c => changedCookies.push({
            ...c, 
            thumbnail: urlFor(c.thumbnail).url()
        }))

        const productItem = {
            id: product?._id,
            title: product?.title,
            price: product?.price,
            cookies: changedCookies,
            cookiesString: renderCookieString(changedCookies),
            image: urlFor(product.thumbnail).url(),
            type: product?.details?.type,
            quantity: 1,
            size: selectedSize ? selectedSize : product.details.sizing
        }

        addProduct({ ...productItem, quantity: 1 });
        router.push("/cart")
    }


    if(product.available) {
        return (
            <Page title={product.title} heading={product.title}>
                {product?.details?.type === "box" &&
                    <>
                        <div className='grid grid-cols-4 p-24 gap-20 pt-24'>
                            {cookiesObject.map((cookie) => {
                                return <div key={cookie.id}>
                                    <Cookie cookie={cookie} />
                                    <div className='flex border border-white'>
                                        <button className={buttonClasses} onClick={() => addCookieToCart(cookie, -1)}>-</button>
                                        <span className={buttonClasses}>{cookie.quantity ? cookie.quantity : 0}</span>
                                        <button className={buttonClasses} onClick={() => addCookieToCart(cookie, +1)} disabled={count === product.details.maxCookies}>+</button>
                                    </div>
                                </div>;
                            })}
                        </div>
                        <div className='sticky bottom-0 left-0 w-full bg-vibrant font-display flex justify-between py-6 px-12 items-center z-20'>
                            <h2 className='text-white text-3xl'>{count}/{product.details.maxCookies} added to box</h2>
                            <div>
                                <span className="font-display text-white px-8 py-4 text-2xl">${product.price}</span>
                                <button className={`font-display bg-white text-vibrant px-8 py-4 text-2xl ${count < product.details.maxCookies ? 'opacity-50' : ''}`} disabled={count < product.details.maxCookies} onClick={handleCart}>Add to cart</button>
                            </div>
                        </div>
                    </>
                }
                {product?.details?.type === "merch" && <div className='space-y-12 flex flex-col justify-center py-12'>
                    <img src={urlFor(product.thumbnail)} className="m-auto w-1/2 md:w-1/3" />
                    {product?.details?.sizing === "t-shirt" ? <><div className='w-full flex justify-center'>
                        <button className={`p-2 text-2xl font-body ${selectedSize === "xs" ? "bg-vibrant text-white" : "bg-white hover:bg-gray-200"}`} onClick={() => setSelectedSize("xs")}>XS</button>
                        <button className={`p-2 text-2xl font-body ${selectedSize === "s" ? "bg-vibrant text-white" : "bg-white hover:bg-gray-200"}`} onClick={() => setSelectedSize("s")}>S</button>
                        <button className={`p-2 text-2xl font-body ${selectedSize === "m" ? "bg-vibrant text-white" : "bg-white hover:bg-gray-200"}`} onClick={() => setSelectedSize("m")}>M</button>
                        <button className={`p-2 text-2xl font-body ${selectedSize === "l" ? "bg-vibrant text-white" : "bg-white hover:bg-gray-200"}`} onClick={() => setSelectedSize("l")}>L</button>
                        <button className={`p-2 text-2xl font-body ${selectedSize === "xl" ? "bg-vibrant text-white" : "bg-white hover:bg-gray-200"}`} onClick={() => setSelectedSize("xl")}>XL</button>
                        <button className={`p-2 text-2xl font-body ${selectedSize === "xxl" ? "bg-vibrant text-white" : "bg-white hover:bg-gray-200"}`} onClick={() => setSelectedSize("xxl")}>XXL</button>
                    </div>
                    <div className='w-full flex justify-center'>
                        <span className="font-display text-vibrant px-8 py-4 text-4xl">${product.price}</span>
                        <button className={`font-display text-white px-8 py-4 text-3xl ${selectedSize ? "bg-vibrant hover:bg-red-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`} disabled={!selectedSize} onClick={handleCart}>Add to cart</button>
                    </div>
                    </> : <div className='w-full flex justify-center'>
                        <span className="font-display text-vibrant px-8 py-4 text-4xl">${product.price}</span>
                        <button className={`font-display bg-vibrant text-white px-8 py-4 text-3xl hover:bg-red-700`} onClick={handleCart}>Add to cart</button>
                    </div>}
                </div>
                }
            </Page>
        )
    } else {
        return (
            <Page title={product.title} heading={product.title}>
                <div className="space-y-12 flex flex-col justify-center w-full items-center py-12">
                    {product.thumbnail && <img src={urlFor(product.thumbnail)} className="m-auto w-1/2 md:w-1/3" />}
                    <h2 className="text-xl md:text-2xl font-body text-vibrant max-w-2xl text-center">We just launched our new store and are still gettting to grips with our operation, this product isn't available for purchase just yet. You can buy <Link href="/merch"><a className='inline text-vibrant font-body underline'>merch</a></Link> or a <Link href="/product/cookie-cake"><a className='inline text-vibrant font-body underline'>cookie cake</a></Link> though.</h2>
                </div>
            </Page>
        )
    }

}


export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type == "product" && defined(slug.current)][].slug.current`
    )
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: true,
    }
}

export async function getStaticProps(context) {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = "" } = context.params
    const product = await client.fetch(`
      *[_type == "product" && slug.current == $slug][0]
    `, { slug })
    const cookies = await client.fetch(`
        *[_type == "cookie" && type == "cookie"] | order(title)
    `);
    return {
        props: {
            product,
            cookies
        }
    }
}
