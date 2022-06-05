const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nqt3zjy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const appointmentCollection = client.db("knockOnce").collection("appointments");

        app.post("/appointment", async (req, res) => {
            const appointmentInfo = req.body;
            const result = await appointmentCollection.insertOne(appointmentInfo);
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Appointment Form server is up and running");
});

app.listen(port, () => {
    console.log("Listening to appointment form, port", port);
});
