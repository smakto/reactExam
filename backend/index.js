const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
app.use(cors());

require("dotenv").config();
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));

const connectionString =
  "mongodb+srv://raizyssarunas:mongoPSWORD@cluster0.gzulqzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(connectionString);

let conn;
let db;

async function connect() {
  try {
    conn = await client.connect();
    db = conn.db("reactExamDB");
  } catch (e) {
    console.error(e);
  }
}

connect();

app.get("/games", async (req, res) => {
  try {
    let collection = await db.collection("gamesMain");
    let results = await collection.find().toArray();
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.post("/games", async (req, res) => {
  try {
    const newGame = req.body;
    console.log(req.body);
    let collection = await db.collection("gamesMain");
    let results = await collection.insertOne(newGame);
    res.json({ success: true });
  } catch (e) {
    res.json(e);
  }
});

app.delete("/games/delete/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection("gamesMain");
    let results = await collection.deleteOne({
      _id: objectedId,
    });
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.patch("/games/edit/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection("gamesMain");
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
