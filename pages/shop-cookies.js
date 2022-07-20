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
        return product.live && <Product product={product} key={product.id} />;
    });

    return (
        <Page
            title="Shop cookies"
            heading="Shop cookies">

            <section className="grid grid-cols-2 border-l border-vibrant">
                {jsxProducts}
            </section>

            <section className="space-y-24 pt-12">
                <h2 className="text-7xl text-center text-mauve font-bold font-display uppercase">Flavours</h2>
                <div className="grid grid-cols-4 max-w-7xl m-auto gap-20">
                    {jsxCookies}
                </div>
            </section>
        </Page>
    )
}

export async function getStaticProps({ params }) {
    const cookies = await client.fetch(`
        *[_type == "cookie" && type == "cookie"] | order(title)
    `);

    const products = await client.fetch(`
        *[_type == "product" && details.type == "box" || details.type == "other"] | order(order)
    `);

    return {
        props: {
            cookies,
            products
        },
        revalidate: 10, // In seconds
    };
}