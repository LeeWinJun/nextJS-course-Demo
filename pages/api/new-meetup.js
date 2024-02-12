//api/new-meetup
//POST /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  //어떤 요청을 받았는지 확인
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect("mongodb+srv://seungdu:dltmdwns52@cluster0.uzksuzz.mongodb.net/?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ messge: "Meetup inserted!" });
  }
}

export default handler;
