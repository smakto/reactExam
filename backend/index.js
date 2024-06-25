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
    let gameLimit = parseInt(req.query.limit) || 100;
    let results = await collection.find().limit(gameLimit).toArray();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/psgames", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection
      .find({ "platform.Playstation": 1 })
      .toArray();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/xboxgames", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find({ "platform.Xbox": 1 }).toArray();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/pcgames", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find({ "platform.PC": 1 }).toArray();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/multiplayer", async (req, res) => {
  try {
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find({ multiplayer: "Yes" }).toArray();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/genre/:genre", async (req, res) => {
  try {
    let gameGenre = req.params.genre;
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection
      .find({ genre: { $regex: new RegExp(gameGenre, "i") } })
      .toArray();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/games/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.find({ _id: objectedId }).toArray();
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/games", async (req, res) => {
  try {
    const newGame = req.body;
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.insertOne(newGame);
    res.status(201).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/games/delete/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
    let results = await collection.deleteOne({
      _id: objectedId,
    });
    res.status(200).send(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.patch("/games/addnote/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
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

app.patch("/games/editnote/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
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

app.patch("/games/editstatus/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection(process.env.DBCOLLECTION);
    let result = await collection.findOneAndUpdate(
      { _id: objectedId },
      { $set: req.body },
      { returnOriginal: false }
    );
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
