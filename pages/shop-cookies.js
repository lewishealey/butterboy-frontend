import Page from "components/Page";
import client from 'utils/sanity';

import Cookie from 'components/Cookie';
import Product from 'components/Product';

export default function Shop({ products, cookies }) {

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

            <div className="grid grid-cols-4 py-12 max-w-7xl m-auto gap-20">
                {jsxCookies}
            </div>
            <section className="grid grid-cols-2 border-t border-vibrant">
                {jsxProducts}
            </section>
        </Page>
    )
}

export async function getStaticProps({ params }) {
    const cookies = await client.fetch(`
        *[_type == "cookie"]
    `);

    const products = await client.fetch(`
        *[_type == "product" && type == "box" || type == "other"] | order(title)
    `);

    return {
        props: {
            cookies,
            products
        },
        revalidate: 10, // In seconds
    };
}