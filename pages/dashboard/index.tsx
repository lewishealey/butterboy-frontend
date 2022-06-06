import Page from "components/Page";
import client from 'utils/sanity';
import { connectToDatabase } from "utils/mongodb";
import { urlFor } from "helpers/sanity";

import Cookie from 'components/Cookie';
import Product from 'components/Product';

export default function Dashboard({ orders }) {
  console.log(orders);

  return (
    <Page
      title="Orders"
      heading="Orders" isAdmin>

      <div className="max-w-7xl m-auto">
      {orders && orders.map(order => <div key={order.id} className="flex flex-col border-b py-4">
        <div>{order.deliveryType}</div>
        <div className="font-body text-xl">
          <h4 className="text-vibrant mb-2">Shipping address</h4>
          <p>{order.shipping.address1}</p>
          <p>{order.shipping.address2}</p>
          <p>{order.shipping.suburb}</p>
          <p>{order.shipping.postcode}</p>
          <p>{order.shipping.country}</p>
        </div>
        {order.items.map((product, i) =>
          <div className="flex w-full" key={`product_${i}`}>
            <div className="w-full flex space-x-2 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12 bg-cream rounded-lg">
                  <div className="h-12 w-12 overflow-hidden"><img src={product.image} /></div>
                  <div className="h-5 w-5 bg-vibrant rounded-full text-xs text-center flex items-center text-white justify-center absolute -top-2 -right-2">{product.quantity}</div>
                </div>
                <h3 className="font-body text-xl text-gray-800">{product.title}</h3>
              </div>
              <span className="font-body text-xl text-gray-800">${product.price}</span>
            </div>
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