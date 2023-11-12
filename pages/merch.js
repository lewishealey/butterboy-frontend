import Page from "components/Page";
import client from "utils/sanity";

import Product from "components/Product";

export default function Merch({ products }) {
  // Loop of products
  const jsxProducts =
    products &&
    products.map((product) => {
      return product.live && <Product product={product} key={product.id} />;
    });

  return (
    <Page title="Merch" heading="Merch">
      <section className="grid grid-cols-2 mb-12 border-l border-vibrant">
        {jsxProducts}
      </section>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const products = await client.fetch(`
        *[_type == "product" && details.type == "merch"] | order(title)
    `);

  return {
    props: {
      products,
    },
  };
}
