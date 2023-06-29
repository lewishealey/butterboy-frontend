import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import Select from "react-select";
import Page from "components/Page";
import Cookie from "components/Cookie";
import { useCart } from "contexts/cart-context";
import client from "utils/sanity";
import { urlFor } from "helpers/sanity";

Modal.setAppElement("#__next");

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid #E50001",
    color: "#E50001",
    backgroundColor: state.isSelected ? "#f1f1f1" : "#FFFFFF",
    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
    fontFamily: "bikoregular, Arial, sans-serif",
    padding: 20,
  }),
  control: (provided) => ({
    ...provided,
    border: "1px solid #E50001",
    height: 60,
    fontSize: 18,
    color: "#E50001",
    fontFamily: "bikoregular, Arial, sans-serif",
  }),
};

export default function WholesaleProduct({ product, cookies }) {
  const router = useRouter();
  const [cookiesObject, setCookiesObject] = useState(cookies);
  const [title, setTitle] = useState(product?.title);

  if (!product) {
    return null;
  }

  const options = [];
  product.cookies &&
    product.cookies.forEach((c) => {
      options.push({
        label: c.title,
        value: c.title,
      });
    });

  let imageSize = "md:w-3/4";
  switch (product.image_size) {
    case "small":
      imageSize = "md:w-1/4";
      break;
    case "medium":
      imageSize = "md:w-1/2";
      break;
  }

  const buttonClasses =
    "font-display px-8 py-4 text-3xl hover:bg-red-700 bg-vibrant text-white";

  return (
    <Page title={title} heading={title}>
      <>
        <button className={buttonClasses}>Get in touch</button>
        <div className="grid grid-cols-1 gap-4 gap-y-12 p-8 md:grid-cols-4 md:p-24 md:gap-20 md;pt-24">
          {cookiesObject.map((cookie, i) => {
            return (
              <div key={cookie.id + "-" + i} className="space-y-4">
                <Cookie cookie={cookie} />
              </div>
            );
          })}
        </div>
      </>
    </Page>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "product-wholesale" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params;
  const product = await client.fetch(
    `
      *[_type == "product-wholesale" && slug.current == $slug][0] {
        ...,
        cookie[]->{
            ...
        }
      }
    `,
    { slug }
  );
  const cookies = await client.fetch(`
        *[_type == "cookie-wholesale"] | order(title)
    `);
  return {
    props: {
      product,
      cookies,
    },
  };
}
