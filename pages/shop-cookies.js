import Page from "components/Page";
import { getCookies, getProducts } from 'utils/wordpress';

import Cookie from 'components/Cookie';
import Product from 'components/Product';

export default function Shop({ cookies, products }) {

    // Loop of cookies
    const jsxCookies = cookies && cookies.map((cookie) => {
        //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
        return <Cookie cookie={cookie} key={cookie.id} />;
    });

    // Loop of products
    const jsxProducts = products && products.map((product) => {
        //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
        return <Product product={product} key={product.id} />;
    });

    return (
        <Page
            title="Shop cookies"
            heading="Shop cookies">

            {/* <div className="grid grid-cols-4 py-12 max-w-7xl m-auto">
                {jsxCookies}
            </div> */}

            <section className="grid grid-cols-2 border-t border-vibrant mt-12">
                {jsxProducts}
            </section>
        </Page>
    )
}

export async function getStaticProps({ params }) {
    const cookies = await getCookies();
    const products = await getProducts().catch((error) =>
      console.error(error)
    );

    // if (!products) {
    //     return {
    //       notFound: true,
    //     };
    // }

    return {
        props: {
            cookies,
            products: products ? products.data : [],
        },
        revalidate: 10, // In seconds
    };
}