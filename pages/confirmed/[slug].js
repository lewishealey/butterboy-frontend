import Page from "components/Page";
import client from 'utils/sanity';
import { connectToDatabase } from "utils/mongodb";
import { ObjectId } from 'mongodb';
import { urlFor } from "helpers/sanity";

import Cookie from 'components/Cookie';
import Product from 'components/Product';
import { useEffect } from "react";

export default function Confirmed({ order }) {

    useEffect(() => {
        const profile = {
          "profiles": [
            {
              "email": "hello@lewi.sh"
            },
            {
              "phone_number": "+13239169023",
              "sms_consent": true
            }
          ]
        }
    
        fetch("/api/subscribe-email", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        }).then((res) => { 
          //console.log(res);
        }).catch(rejected => {
            console.log(rejected);
        });
    
    }, [])

    return (
        <Page
            title="Confirmed"
            heading="Confirmed">

            Confirmed {order._id}
            Order type {order.deliveryType} - {order.pick_up_date} {order.pick_up_time}
            
            <div className="m-auto max-w-6xl space-y-8">
                <section className="grid grid-cols-2 gap-20">
                    <div className="font-body text-xl">
                        <h4 className="text-vibrant">Shipping address</h4>
                        <p>{order.shipping.address1}</p>
                        <p>{order.shipping.address2}</p>
                        <p>{order.shipping.suburb}</p>
                        <p>{order.shipping.postcode}</p>
                        <p>{order.shipping.country}</p>
                    </div>
                    <div className="font-body text-xl">
                        <h4 className="text-vibrant">Billing address</h4>
                        <p>{order.billing.address1}</p>
                        <p>{order.billing.address2}</p>
                        <p>{order.billing.suburb}</p>
                        <p>{order.billing.postcode}</p>
                        <p>{order.billing.country}</p>
                    </div>
                </section>
                <section>
                {order.items.map((product, i) =>
                    <div className="flex w-full" key={`product_${i}`}>
                        <div className="w-full flex space-x-2 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative h-12 w-12 bg-white rounded-lg">
                            <div className="h-12 w-12 overflow-hidden"><img src={urlFor(product.image)} /></div>
                            <div className="h-5 w-5 bg-vibrant rounded-full text-xs text-center flex items-center text-white justify-center absolute -top-2 -right-2">{product.quantity}</div>
                            </div>
                            <h3 className="font-body text-xl text-gray-800">{product.title}</h3>
                        </div>
                        <span className="font-body text-xl text-gray-800">${product.price}</span>
                        </div>
                    </div>
                    )}
                    <div>{order.total.totalPrice}</div>
                    <div>{order.orderNotes}</div>
                    <div>{order.deliveryCost}</div>
                    <section>
                        <div className="font-body text-xl text-gray-800">{order.email}</div>
                        <div className="font-body text-xl text-gray-800">{order.phone}</div>
                    </section>
                </section>
            </div>
        </Page>
    )
}

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();
    const { slug = "" } = context.params;
    
    const order = await db.collection("orders").findOne( { _id: ObjectId(slug) });
    
  
    return {
      props: {
        order: JSON.parse(JSON.stringify(order)),
      },
    };
  }