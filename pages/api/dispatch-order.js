import { connectToDatabase } from "utils/mongodb";
import { ObjectId } from 'mongodb';
const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let data = req.body;

    const order = await db.collection("orders").findOne({ _id: ObjectId(data.id) });
    const filter = { _id: order._id };
    let updateDoc = {};
    let template;
    let subject;

    if(order.deliveryType === "cookie-delivery") {
        order.tracking = data.tracking;
        template = "local-dispatch";
        subject = `Order #${order.order_number} on its way`;
        updateDoc = {
          $set: {
            completed: true,
            shipped: true,
            tracking: data.tracking
          },
        };
    }

    if(order.deliveryType === "merch-delivery") {
        order.tracking = data.tracking;
        template = "order-dispatch";
        subject = `Order #${order.order_number} on its way`;
        updateDoc = {
          $set: {
            completed: true,
            shipped: true,
            tracking: data.tracking
          },
        };
    }

    if(order.deliveryType === "collect") {
        template = "ready-for-collection";
        subject = `Order #${order.order_number} ready for collection`;
        updateDoc = {
          $set: {
            completed: true,
            ready: true
          },
        };
    }

    try {
      let collection = db.collection("orders");
      collection.updateOne(filter, updateDoc);
    } catch(e){
      console.error("Error")
      res.json(e);
    } finally {
      client.transmissions
      .send({
        metadata: order,
        content: {
          template_id: template,
          subject: subject
        },
        recipients: [
          {
            address: {
              email: order.email,
              name: `${order.shipping.firstName} ${order.shipping.lastName}`
            }
          }
        ]
      })
      .then((data) => {
        return res.status(200).end();
      })
      .catch((err) => {
        return res.status(500).send(error);
      });
    }
};