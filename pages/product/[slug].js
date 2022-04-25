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
    const [cookiesAdded, setCookiesAdded] = useState([]);
    const { addProduct } = useCart();

    const jsxCookies = cookies.map((cookie) => {
        return <AddToBox onSelect={addCookieToCart} cookie={cookie} count={cookiesAdded} max={6}><Cookie cookie={cookie} key={cookie.id} /></AddToBox>;
    });

    function openModal() {
        setIsOpen(true);
    }

    function addCookieToCart(data) {
        const cookies = cookiesAdded.filter(x => x.id !== data.id);

        // If quantity is 0 then remove from object
        if (data.quantity === 0) {
            setCookiesAdded(cookies);
        } else {
            setCookiesAdded([...cookies, data]);
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    if (!product) {
        return null;
    }

    function countCookies() {
        let sumCookiesAdded = 0;
        cookiesAdded.forEach(added =>
            sumCookiesAdded = sumCookiesAdded + added.quantity
        )
        return sumCookiesAdded;
    }

    function handleCart() {
        const productItem = {
            id: product?.id,
            sku: product?.sku,
            title: product?.name,
            price: product?.price,
            cookies: cookiesAdded,
            image: product?.images[0]?.src,
            quantity: 1,
        }
        addProduct({ ...productItem, quantity: 1 });
        router.push("/cart")
    }

    return (
        <Page title={product.name} heading={product.name}>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='sticky top-0 left-0 w-full bg-vibrant font-display flex justify-between py-6 px-12 items-center z-20'>
                    <h2 className='text-white text-3xl'>{countCookies()}/6 added to box</h2>
                    <button className={`font-display bg-white text-vibrant px-8 py-4 text-2xl ${countCookies() < 6 ? 'opacity-50' : ''}`} disabled={countCookies() < 6} onClick={handleCart}>Add to cart</button>
                </div>
                <div className='grid grid-cols-4 p-6 gap-4'>
                    {jsxCookies}
                </div>
            </Modal>

            <div className="flex border-b border-t border-vibrant mt-12">
                <div className='flex flex-1 border-r border-b border-vibrant justify-center'>
                    <Image src={product.images[0].src} width={600} height={500} />
                </div>
                <div className='flex flex-1 border-r border-b border-vibrant items-center justify-center flex-col space-y-6'>
                    <h2 className="text-5xl font-body uppercase text-vibrant">${product.price}</h2>
                    <button className='text-white px-8 py-4 bg-vibrant hover:text-vibrant hover:bg-mauve font-heading uppercase text-2xl' onClick={openModal}>Select cookies</button>
                </div>
            </div>

        </Page>
    )
}

export async function getStaticPaths() {
    const paths = await getSlugs('products');
    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {
    const product = await getProduct(params.slug);
    const cookies = await getCookies();

    return {
        props: {
            cookies,
            product,
        },
        revalidate: 10, // In seconds
    };
}