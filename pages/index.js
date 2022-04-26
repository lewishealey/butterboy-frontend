import Page from "components/Page"
import Marquee from "react-fast-marquee";
import { getCookies, getProducts } from 'utils/wordpress';

import Cookie from 'components/Cookie';
import Product from 'components/Product';
import Address from 'components/Address';

// https://academind.com/tutorials/nextjs-wordpress-headless-cms#setting-up-wordpress-on-a-subdomain

export default function Home({ cookies, products }) {

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
      title="Homepage">

      <img src="logo.png" style={{ width: "60%" }} className="m-auto py-12" />

      <Marquee className="bg-vibrant text-white font-body text-3xl py-6" gradient={false}>
      THE BUTTERBOY VAN IS ON THE ROAD EVERY TUESDAY AND THURSDAY. ONLINE ORDERING FOR THE ENTIRIES - THE BUTTERBOY VAN IS ON THE ROAD EVERY TUESDAY AND THURSDAY. ONLINE ORDERING FOR THE ENTIRIES
      </Marquee>

      <h2 className="uppercase font-display text-mauve text-8xl text-center py-16">THE BEST COOKIES<br /> IN TOWN!</h2>

      <section className="grid grid-cols-2 border-t border-vibrant">
        {jsxProducts}
      </section>
      <Address />
    </Page>
  )
}


export async function getStaticProps({ params }) {
  const cookies = await getCookies();
  const products = await getProducts().catch((error) =>
    console.error(error)
  );

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cookies,
      products: products ? products.data : [],
    },
    revalidate: 10, // In seconds
  };
}