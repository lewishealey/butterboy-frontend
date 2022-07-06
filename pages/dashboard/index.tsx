import Page from "components/Page";
import client from 'utils/sanity';
import { connectToDatabase } from "utils/mongodb";
import imageUrlBuilder from '@sanity/image-url';
import moment from 'moment';

const builder = imageUrlBuilder(client)

import Cookie from 'components/Cookie';
import Product from 'components/Product';
import { useState } from "react";

export default function Dashboard({ orders }) {
  console.log(orders);

  const [orderData, setOrderData] = useState(orders);
  const [filter, setFilter] = useState("all");
  //https://cdn.sanity.io/images/ot7oiwja/production/834d7b1afb8050660f403fcf2788dc3222fe333a-1050x940.png

  function filterOrderByDeliveryType(type) {
    setFilter(type);
    if(type === "all") {
      setOrderData(orders);
    } else {
      setOrderData(orders.filter(x => x.deliveryType === type));
    }
  }

  function urlFor(source) {
    return builder.image(source)
  }

  const buttonClasses = "font-display text-xl uppercase text-gray-600 hover:text-gray-800";
  const activeButtonClasses = "font-display text-xl uppercase text-vibrant";

  return (
    <Page
      title="Orders"
      heading="Orders" isAdmin>
      <div className="max-w-7xl m-auto w-full space-y-4 py-8">
      <nav className="flex space-x-4">
          <button className={filter === "all" ? activeButtonClasses : buttonClasses} onClick={() => filterOrderByDeliveryType("all")}>All</button>
          <button className={filter === "collect" ? activeButtonClasses : buttonClasses} onClick={() => filterOrderByDeliveryType("collect")}>Collection</button>
          <button className={filter === "cookie-delivery" ? activeButtonClasses : buttonClasses} onClick={() => filterOrderByDeliveryType("delivery")}>Cookie delivery</button>
          <button className={filter === "merch-delivery" ? activeButtonClasses : buttonClasses} onClick={() => filterOrderByDeliveryType("delivery")}>Merch delivery</button>
        </nav>
        {orderData && orderData.map(order =>
          <div className="border border-vibrant" key={order.id}>
            <div className="flex bg-vibrant text-white font-display uppercase py-3 px-4 justify-between items-center">
              <span className="text-xl">{order.deliveryType} order #{order.order_number}</span>
              {order.deliveryType === "collect" && <button className="bg-white font-display text-vibrant text-xl py-2 px-4">Ready for collection</button>}
              {order.deliveryType === "delivery" && <button className="bg-white font-display text-vibrant text-xl py-2 px-4">Send delivery email</button>}
            </div>
            <div className="p-4">
              <p className="font-body text-2xl">{order.billing.firstName} {order.billing.lastName}</p>
              <p className="font-body text-2xl">{order.email}</p>
            </div>
            <div className="px-4 py-2">
              <p className="font-body text-lg">Ordered on {order.date_created}</p>
            </div>
            {order.deliveryType === "collect" && <div className="border-t border-vibrant px-4 font-body  py-3 text-xl">
              Pick up {order.pick_up_date} {order.pick_up_time}
            </div>}
            {order.deliveryType === "delivery" && <div className="font-body text-xl p-4 pt-0">
              <h4 className=" mb-2">Shipping address</h4>
              <p>{order.shipping.address1}</p>
              <p>{order.shipping.address2}</p>
              <p>{order.shipping.suburb}</p>
              <p>{order.shipping.postcode}</p>
              <p>{order.shipping.country}</p>
            </div>}
            {order.items.map((product, i) =>
              <div key={`product_${i}`} className="border-t border-vibrant pt-4">
                <h3 className="text-xl px-4 font-display uppercase 
                  ">{product.title} x {product.quantity}</h3>
                {product.cookies && <div className="p-4">
                  {product.cookies.map(cookie =>
                    <div key={cookie._id} className="flex space-x-2">
                      <img src={urlFor(cookie.thumbnail) as any} className="w-8 h-8" />
                      <span className="text-xl font-body">{cookie.quantity} X {cookie.title}</span>
                    </div>
                  )}
                </div>}
              </div>
            )}
          </div>)}
      </div>
    </Page>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const orders = await db
    .collection("orders")
    .find({})
    .toArray();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}