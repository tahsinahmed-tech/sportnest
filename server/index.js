import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_URI);

app.use(cors())
app.use(express.json())

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();
const sportNestDb = await mongoClient.db("sport_nest_db");
const facilitiesCollection = await sportNestDb.collection("facilities");
const facilitiesBookingCollection = await sportNestDb.collection("facilitiesBooking");



app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/facilities', async (req, res) => {
//   const result = await facilitiesCollection.find().toArray();
//   res.send(result);
// });



app.get('/facilities', async (req, res) => {
  try {
    const result = await facilitiesCollection.find().toArray();

    res.status(200).send({
      success: true,
      message: "Successfully get facilities data",
      data: result
    });

  }

  catch (err) {
    console.error(err);

    res.status(500).send({
      success: false,
      message: "Internal Server Error"
    })
  }
});


app.get('/facilities/:id', async (req, res) => {
  try {
    const {id} = req.params;

    if(!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid facility ID"
      })
    }

    const result = await facilitiesCollection.findOne({
      _id: new ObjectId(id)
    });

    // Handle facility not found
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Facility not found"
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully get facilities data",
      data: result
    });

  }

  catch (err) {
    console.error(err);

    res.status(500).send({
      success: false,
      message: "Internal Server Error"
    })
  }
});


// app.post('/facilities', async (req, res) => {
//   const facilityData = req.body;
//   const result = facilitiesCollection.insertOne(facilityData)
//   res.send(result);
// });


app.post('/facilities', async (req, res) => {
  try {
    const facilityData = req.body;    

    if(
      !facilityData || 
      typeof facilityData !== "object" ||
      Array.isArray(facilityData) ||
      Object.keys(facilityData).length === 0
    ) {

      return res.status(400).send({
        success: false,
        message: "Invalid facility data"
      })

    }

    const result = await facilitiesCollection.insertOne(facilityData);

    res.status(201).send({
      success: true,
      message: "Inserted Facility Successfully",
      insertedId: result.insertedId
    });
  }

  catch (err) {
    console.error("Failed to create facility ", err);

    res.status(500).send({
      success: false,
      message: "Internal Server Error"
    })
  }
});


app.post('/facilities/booking', async (req, res) => {
  try {
    const facilityBookingData = req.body;    

    if(
      !facilityBookingData || 
      typeof facilityBookingData !== "object" ||
      Array.isArray(facilityBookingData) ||
      Object.keys(facilityBookingData).length === 0
    ) {

      return res.status(400).send({
        success: false,
        message: "Invalid facility data"
      })

    }

    const result = await facilitiesBookingCollection.insertOne(facilityBookingData);

    res.status(201).send({
      success: true,
      message: "Inserted Facility Successfully",
      insertedId: result.insertedId
    });
  }

  catch (err) {
    console.error("Failed to booking facility", err);

    res.status(500).send({
      success: false,
      message: "Internal Server Error"
    })
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});