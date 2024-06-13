const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
app.use(cors());

require("dotenv").config();
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));

const connectionString = process.env.CONNECTIONSTRING;

const client = new MongoClient(connectionString);

let conn;
let db;

async function connect() {
  try {
    conn = await client.connect();
    db = conn.db(process.env.DATABASE);
  } catch (e) {
    console.error(e);
  }
}

connect();

app.get("/games", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find().toArray();
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.get("/psgames", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection
      .find({ "platform.Playstation": 1 })
      .toArray();
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.get("/xboxgames", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find({ "platform.Xbox": 1 }).toArray();
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.get("/pcgames", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find({ "platform.PC": 1 }).toArray();
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.get("/games/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find({ _id: objectedId }).toArray();
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.post("/games", async (req, res) => {
  try {
    const newGame = req.body;
    console.log(req.body);
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.insertOne(newGame);
    res.json({ success: true });
  } catch (e) {
    res.json(e);
  }
});

app.delete("/games/delete/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.deleteOne({
      _id: objectedId,
    });
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.patch("/games/editnote/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
    console.log(req.body);
    let result = await collection.findOneAndUpdate(
      { _id: objectedId },
      { $set: { note: req.body } },
      { returnOriginal: false }
    );
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
