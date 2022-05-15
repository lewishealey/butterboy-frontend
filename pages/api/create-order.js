import { connectToDatabase } from "utils/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  let data = req.body;

  try {
    let collection = db.collection("orders");
    collection.insertOne(data, function(err,docsInserted){
        res.json(docsInserted);
    });

  } catch(e){
    console.error("Error")
    res.json(e);
  }
};