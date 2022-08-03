import { connectToDatabase } from "utils/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  try {
    const orders = await db
    .collection("orders")
    .find({})
    .sort({ sort_date: -1 })
    .toArray();
    
    res.status(200).json(orders);

  } catch(e){
    console.error("Error")
    res.status(500).json(e);
  }
};