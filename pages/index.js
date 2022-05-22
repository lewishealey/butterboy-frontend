import Page from "components/Page"
import Marquee from "react-fast-marquee";
import { getBoxes, getOther } from 'utils/wordpress';
import client from 'utils/sanity';
import Image from 'next/image'
import Cookie from 'components/Cookie';
import Product from 'components/Product';
import Address from 'components/Address';

// https://academind.com/tutorials/nextjs-wordpress-headless-cms#setting-up-wordpress-on-a-subdomain

export default function Home({ products }) {

  //Loop of products
  const jsxBoxes = products && products.map((p) => {
    //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
    return <Product product={p} key={p._id} />;
  });

  return (
    <Page
      title="Homepage">

      <div className="relative py-12">
        <div className="absolute w-full"><img src="logo.png" className="m-auto" style={{ width: "70%" }} /></div>
        <div className="relative">
          <Image src="/banner.png" layout="responsive" width={400} height={250} />
        </div>
      </div>

      <Marquee className="bg-vibrant text-white font-body text-3xl py-6" gradient={false}>
        THE BUTTERBOY VAN IS ON THE ROAD EVERY TUESDAY AND THURSDAY. ONLINE ORDERING FOR THE ENTIRIES - THE BUTTERBOY VAN IS ON THE ROAD EVERY TUESDAY AND THURSDAY. ONLINE ORDERING FOR THE ENTIRIES
      </Marquee>
      <video
        className="md:w-full h-full object-cover z-auto"
        autoPlay
        muted
        loop
        poster="poster.png"
      >
         <source
            src="homepage.mp4"
            type="video/mp4"
            className="md:w-full h-full object-cover z-auto"
          />
          <source
            src="homepage.webm"
            type="video/webm"
            className="md:w-full h-full object-cover z-auto"
          />
      </video>

      <h2 className="uppercase font-display text-mauve text-8xl text-center py-16">THE BEST COOKIES<br /> IN TOWN!</h2>

      <section className="grid grid-cols-2 border-t border-vibrant">
        {jsxBoxes}
      </section>
      <Address />
    </Page>
  )
}


export async function getStaticProps() {
  const products = await client.fetch(`
    *[_type == "product"]
  `);
  return {
    props: {
      products,
    },
  };
}