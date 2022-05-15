import Head from 'next/head'
import Image from 'next/image'
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
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cookiesObject, setCookiesObject] = useState(cookies);
    const { addProduct } = useCart();
    const [maxCookies, setMaxCookies] = useState(false);
    const [count, setCount] = useState(0);
    const buttonClasses = "flex-1 text-xl text-vibrant text-center py-2";

    function openModal() {
        setIsOpen(true);
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


    function closeModal() {
        setIsOpen(false);
    }

    if (!product) {
        return null;
    }

    function handleCart() {
        const addedCookies = cookiesObject.filter(c => c.quantity > 0);
        const productItem = {
            id: product?._id,
            title: product?.title,
            price: product?.price,
            cookies: addedCookies,
            image: product.thumbnail,
            quantity: 1,
        }
        addProduct({ ...productItem, quantity: 1 });
        router.push("/cart")
    }

    return (
        <Page title={product.title} heading={product.title}>
            {product.type === "box" &&
                <>
                    <div className='grid grid-cols-4 p-24 gap-20 pt-24'>
                        {cookiesObject.map((cookie) => {
                            return <div key={cookie.id}>
                                <Cookie cookie={cookie} />
                                <div className='flex border border-white'>
                                    <button className={buttonClasses} onClick={() => addCookieToCart(cookie, -1)}>-</button>
                                    <span className={buttonClasses}>{cookie.quantity ? cookie.quantity : 0}</span>
                                    <button className={buttonClasses} onClick={() => addCookieToCart(cookie, +1)} disabled={count === product.maxCookies}>+</button>
                                </div>
                            </div>;
                        })}
                    </div>
                    <div className='sticky bottom-0 left-0 w-full bg-vibrant font-display flex justify-between py-6 px-12 items-center z-20'>
                        <h2 className='text-white text-3xl'>{count}/{product.maxCookies} added to box</h2>
                        <div>
                            <span className="font-display text-white px-8 py-4 text-2xl">${product.price}</span>
                            <button className={`font-display bg-white text-vibrant px-8 py-4 text-2xl ${count < product.maxCookies ? 'opacity-50' : ''}`} disabled={count < product.maxCookies} onClick={handleCart}>Add to cart</button>
                        </div>
                    </div>
                </>
            }
        </Page>
    )
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
        *[_type == "cookie"]
    `);
    return {
        props: {
            product,
            cookies
        }
    }
}
