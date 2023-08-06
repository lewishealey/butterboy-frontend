import React, { useState, useMemo } from "react";
import Page from "components/Page";
import Map, { Source, Marker, Popup } from "react-map-gl";
import client from "utils/sanity";
import { urlFor } from "helpers/sanity";
import Cookie from "components/Cookie";
import { useMediaQuery } from "react-responsive";

export default function WholesaleRetail({ products, cookies }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [query, setQuery] = useState("");
  const isTabletAndBelow = useMediaQuery({ query: "(max-width: 600px)" });
  const [data, setData] = useState(products);

  if (!products) {
    return <div>Loading...</div>;
  }

  console.log("products", products);

  return (
    <Page title="Menu" heading="Menu" isAdmin fullWidth>
      {products.map((product, i) => (
        <div className="w-full" key={`product_${product._id}`}>
          <div
            className={`uppercase font-display text-vibrant text-2xl md:text-4xl text-center py-12 ${
              i === 0 ? "border-b" : "border-t"
            } border-vibrant`}
          >
            {product.title}
          </div>
          {product?.details?.type === "merch" && (
            <div>
              <img
                src={urlFor(product.thumbnail).width(800)}
                className={`m-auto w-full py-12`}
                style={{ maxWidth: 400 }}
              />
            </div>
          )}
          {product?.cookies && (
            <div className="grid grid-cols-1 md:grid-cols-4 px-8 md:px-0 max-w-7xl m-auto gap-12 md:gap-20 py-12">
              {product?.cookies.map((cookie) => {
                const cook = cookies.find((c) => c._id === cookie._ref);
                if (cook) {
                  return <Cookie cookie={cook} key={cook.id} />;
                }
              })}
            </div>
          )}
          {product?.details?.flavours && (
            <div className="grid grid-cols-1 md:grid-cols-4 px-8 md:px-0 max-w-7xl m-auto gap-12 md:gap-20 py-12">
              {product?.details?.flavours?.map((cookie) => {
                const cook = cookies.find((c) => c._id === cookie._ref);
                if (cook) {
                  return <Cookie cookie={cook} key={cook.id} />;
                }
              })}
            </div>
          )}
        </div>
      ))}
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const products = await client.fetch(`
    *[_type == "product-wholesale"] | order(order asc)
  `);

  const cookies = await client.fetch(`
  *[_type == "cookie-wholesale"] | order(title)
`);

  return {
    props: {
      cookies,
      products,
    },
  };
}
