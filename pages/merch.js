import Page from "components/Page";
import client from 'utils/sanity';

import Cookie from 'components/Cookie';
import Product from 'components/Product';

export default function Merch({ products }) {

    // Loop of products
    const jsxProducts = products && products.map((product) => {
        //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
        return <Product product={product} key={product.id} />;
    });

    return (
        <Page
            title="Merch"
            heading="Merch">

            <section className="grid grid-cols-2 mt-24 border-t border-vibrant mb-12">
                {jsxProducts}
            </section>
        </Page>
    )
}

export async function getStaticProps({ params }) {

    const products = await client.fetch(`
        *[_type == "product" && details.type == "merch"] | order(title)
    `);

    return {
        props: {
            products
        },
        revalidate: 10, // In seconds
    };
}