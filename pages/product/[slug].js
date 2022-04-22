import Head from 'next/head'
import Image from 'next/image'
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { getSlugs, getProduct, getCookies } from 'utils/wordpress';
import Page from "components/Page";
import Cookie from 'components/Cookie';
import AddToCart from 'components/AddToCart';

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
        background: "#DCC9E8",
    },
};

export default function SingleProduct({ product, cookies }) {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const jsxCookies = cookies.map((cookie) => {
        //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
        return <AddToCart onSelect={() => addCookieToCart(cookie)}><Cookie cookie={cookie} key={cookie.id} /></AddToCart>;
    });

    function openModal() {
        setIsOpen(true);
    }

    function addCookieToCart(cookie) {
        console.log({
            id: cookie.id,
            name: cookie.name,
            slug: cookie.slug,
            quantity: 1
        })
    }

    function closeModal() {
        setIsOpen(false);
    }

    console.log(product)

    if (!product) {
        return null;
    }

    return (
        <Page title={product.name} heading={product.name}>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
            <div className='grid grid-cols-4'>
            {jsxCookies}
                </div>
            </Modal>

            <div className="flex border-b border-t border-vibrant mt-12">
                <div className='flex flex-1 border-r border-b border-vibrant justify-center'>
                    <Image src={product.images[0].src} width={600} height={500} />
                </div>
                <div className='flex flex-1 border-r border-b border-vibrant items-center justify-center'>
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