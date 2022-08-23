import { useEffect, useState } from "react";
import { useCart } from "contexts/cart-context";
import { generatePurchaseObject } from "utils/ga";
import Script from "next/script";
import Page from "components/Page";

export default function Confirmed({ slug }) {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("loading");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    
    fetch("/api/get-order", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slug),
    })
      .then((response) => response.json())
      .then((res) => {
        setStatus("loaded");
        setOrder(res);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  }, []);

  if (status == "loading") {
    return (
      <Page title="Loading..." heading="Loading...">
        {/* <div className="py-8 space-y-4">
            <h2 className="font-body text-2xl text-center text-vibrant">No order of that ID</h2>
            <Link href="/shop-cookies"><a className="underline uppercase text-vibrant font-body text-xl text-center w-full flex justify-center">Continue Shopping</a></Link>
        </div> */}
      </Page>
    );
  }

  return (
    <Page title="Confirmed!" heading="Confirmed!">
      <div className="flex min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="bg-cream p-8 md:p-16 flex justify-center">
          <div className="flex flex-col w-full space-y-4 max-w-xl">
            <h2 className="text-xl font-body">
              We'll send you a confirmation email with all the details you need.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full border-b border-gray-300 pb-4 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className="font-body font-bold text-xl text-vibrant">
                  Order number
                </h4>
                <p className="font-body text-xl">{order.order_number}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-body font-bold text-xl text-vibrant">
                  Order date
                </h4>
                <p className="font-body text-xl">{order.date_created}</p>
              </div>
            </div>
            <div className="space-y-2 border-b border-gray-300 pb-4">
              <h4 className="font-body font-bold text-xl text-vibrant">
                Customer details
              </h4>
              <p className="font-body text-lg">
                {order.email} - {order.phone}
              </p>
            </div>
            {order.deliveryType === "collect" && (
              <div className="space-y-2 border-b border-gray-300 pb-4">
                <h4 className="font-body font-bold text-xl text-vibrant">
                  Collection details
                </h4>
                <p className="font-body text-lg">
                  {order.pick_up_date} {order.pick_up_time}
                </p>
              </div>
            )}
            {order.deliveryType === "local-delivery" && (
              <div className="space-y-2 border-b border-gray-300 pb-4">
                <h4 className="font-body font-bold text-xl text-vibrant">
                  Delivery details
                </h4>
                <p className="font-body text-lg">
                  {order.pick_up_date} {order.pick_up_time}
                </p>
              </div>
            )}
            {order.orderMessage && (
              <div className="space-y-2 border-b border-gray-300 pb-4">
                <h4 className="font-body font-bold text-xl text-vibrant">
                  Message
                </h4>
                <p className="font-body text-lg">{order.orderMessage}</p>
              </div>
            )}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {order.deliveryType === "delivery" && (
                <div className="font-body text-xl">
                  <h4 className="text-vibrant mb-2">Shipping address</h4>
                  <p>{order.shipping.address1}</p>
                  <p>{order.shipping.address2}</p>
                  <p>{order.shipping.suburb}</p>
                  <p>{order.shipping.postcode}</p>
                  <p>{order.shipping.country}</p>
                </div>
              )}
              <div className="font-body text-xl">
                <h4 className="text-vibrant mb-2">Billing address</h4>
                <p>{order.billing.address1}</p>
                <p>{order.billing.address2}</p>
                <p>{order.billing.suburb}</p>
                <p>{order.billing.postcode}</p>
                <p>{order.billing.country}</p>
              </div>
            </section>
          </div>
        </div>
        <div className="bg-cream border-l border-vibrant">
          <div className="p-6 md:p-12 space-y-6 pt-6 md:pt-24">
            {order.items.map((product, i) => (
              <div className="flex w-full" key={`product_${i}`}>
                <div className="w-full flex space-x-2 items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className="relative h-12 w-12 bg-cream rounded-lg">
                      <div className="h-12 w-12 overflow-hidden">
                        <img src={product.image} />
                      </div>
                      <div className="h-5 w-5 bg-vibrant rounded-full text-xs text-center flex items-center text-white justify-center absolute -top-2 -right-2">
                        {product.quantity}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-body text-xl text-gray-800">
                        {product.title}
                      </h3>
                      {product.cookiesString && (
                        <p className="font-body text-gray-600">
                          {product.cookiesString}
                        </p>
                      )}
                      {product.selectedOption && (
                        <p className="font-body text-gray-600">
                          {product.selectedOption.label}
                        </p>
                      )}
                      {product.message && <p className="font-body text-gray-600">"{product.message}"</p>}
                      {product.size && (
                        <h4 className="font-body text-lg text-gray-800 mb-6 uppercase">
                          {product.size}
                        </h4>
                      )}
                    </div>
                  </div>
                  <span className="font-body text-xl text-gray-800">
                    ${product.price}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex flex-col justify-between py-6 border-t border-b space-y-2">
              <div className="flex w-full justify-between">
                <div className="font-body text-xl">Subtotal</div>
                <div className="font-body text-xl">
                  ${order.subtotal.totalPrice.toFixed(2)}
                </div>
              </div>
              {order.deliveryType !== "collect" && order.delivery && (
                <div className="flex w-full justify-between">
                  <div className="font-body text-xl">
                    Shipping ({order.delivery.type})
                  </div>
                  {order.delivery && order.delivery.price && (
                    <div className="font-body text-xl">
                      ${order.delivery.price.toFixed(2)}
                    </div>
                  )}
                </div>
              )}
            </div>
            {order.total && (
              <div className="flex flex-col justify-between space-y-2">
                <div className="flex w-full justify-between">
                  <div className="font-body text-xl">Total</div>
                  <div className="font-body text-2xl space-x-2 items-center flex">
                    <span className="text-base text-gray-500">AUD</span>
                    <span className="text-3xl">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {order && <Script
        strategy="afterInteractive"
        id="purchase-data"
        dangerouslySetInnerHTML={{
          __html: `gtag('event', 'purchase', ${generatePurchaseObject(order)});`,
        }}
      />}
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { slug = "" } = context.params;
  return {
    props: {
      slug: slug,
    },
  };
}
