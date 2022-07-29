import { connectToDatabase } from "utils/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let data = req.body;

  try {
    const order = await db.collection("orders").findOne({ _id: ObjectId(data) });
    res.status(200).json(order);

  } catch(e){
    console.error("Error")
    res.status(500).json(e);
  }
};