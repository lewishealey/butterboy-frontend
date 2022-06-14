import Page from "components/Page";
import client from 'utils/sanity';
import { connectToDatabase } from "utils/mongodb";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

import Cookie from 'components/Cookie';
import Product from 'components/Product';

export default function Dashboard({ orders }) {
  console.log(orders);

  //https://cdn.sanity.io/images/ot7oiwja/production/834d7b1afb8050660f403fcf2788dc3222fe333a-1050x940.png

  function urlFor(source) {
    return builder.image(source)
  }

  return (
    <Page
      title="Orders"
      heading="Orders" isAdmin>

      <div className="max-w-7xl m-auto w-full space-y-4 py-8">
        {orders && orders.map(order =>
          <div className="border border-vibrant" key={order.id}>
            <div className="flex bg-vibrant text-white font-display uppercase py-3 px-4 justify-between items-center">
              <span className="text-xl">{order.deliveryType} order #{order.order_number} - {order.date_created}</span>
              {order.deliveryType === "collect" && <button className="bg-white font-display text-vibrant text-xl py-2 px-4">Ready for collection</button>}
              {order.deliveryType === "delivery" && <button className="bg-white font-display text-vibrant text-xl py-2 px-4">Send delivery email</button>}
            </div>
            <div className="p-4">
              <p className="font-body text-2xl">{order.billing.firstName} {order.billing.lastName}</p>
              <p className="font-body text-2xl">{order.email}</p>
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
    .sort({ date_created: -1 })
    .toArray();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}