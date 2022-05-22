import Page from "components/Page";
import client from 'utils/sanity';
import { connectToDatabase } from "utils/mongodb";

import Cookie from 'components/Cookie';
import Product from 'components/Product';

export default function Dashboard({ orders }) {
    console.log(orders);

    return (
        <Page
            title="Orders"
            heading="Orders" isAdmin>

           Orders
           {orders && orders.map(order => <div key={order.id} className="flex border-b py-4">
            <div>{order.stripe_id}</div>
            <div>{order.deliveryType}</div>
               <div>{order.deliveryType}</div>
               <div>{order.items && order.items.map(item => <div key={item.id}>{item.title}</div>)}</div>
           </div>)}
        </Page>
    )
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
  
    const orders = await db
      .collection("orders")
      .find({})
      .sort({ date_created: -1})
      .toArray();
  
    return {
      props: {
        orders: JSON.parse(JSON.stringify(orders)),
      },
    };
  }