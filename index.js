const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectID = mongodb.ObjectID;

// const dbURL = "mongodb://127.0.0.1:27017";
const dbURL =
  "mongodb+srv://Dharani:w5LR4buptk9ardeC@cluster0.bxsj0.mongodb.net/studentCount?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("your app is running in", port));

app.get("/", (req, res) => {
  res.send("<h1>Simple GET, POST, PUT & DELETE request app..! </h1>");
});

app.get("/counts", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    let db = client.db("studentCount");
    db.collection("counts")
      .find()
      .toArray()
      .then((details) => {
        db.collection("students")
          .find()
          .toArray()
          .then((data) => {
            let information = details.map((element) => {
              let studentcount = data.filter(
                (count) => count.staff_id == element.id
              ).length;
              return {
                _id: element._id,
                id: element.id,
                staff_name: element.staff_name,
                email: element.email,
                student_Count: studentcount,
              };
            });
            res.status(200).json(information);
          });
      })
      .catch((err) => {
        res.status(404).json({
          message: "No data Found or some error happen",
          error: err,
        });
      });
  });
});

app.post("/counts", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    client
      .db("studentCount")
      .collection("counts")
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        client.close();
        console.log("User Created successfully, Connection closed");
        res.status(200).json({
          message: "User Created..!!",
        });
      });
  });
});

app.put("/counts/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentCount")
      .collection("counts")
      .findOneAndUpdate({ _id: objectID(req.params.id) }, { $set: req.body })
      .then((data) => {
        console.log("User data update successfully..!!");
        client.close();
        res.status(200).json({
          message: "User data updated..!!",
        });
      });
  });
});

app.delete("/counts/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentCount")
      .collection("counts")
      .deleteOne({ _id: objectID(req.params.id) }, (err, data) => {
        if (err) throw err;
        client.close();
        res.status(200).json({
          message: "User deleted...!!",
        });
      });
  });
});
app.get("/students", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    let db = client.db("studentCount");
    db.collection("students")
      .find()
      .toArray()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(404).json({
          message: "No data Found or some error happen",
          error: err,
        });
      });
  });
});

app.post("/students", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    client
      .db("studentCount")
      .collection("students")
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        client.close();
        console.log("User Created successfully, Connection closed");
        res.status(200).json({
          message: "User Created..!!",
        });
      });
  });
});

app.put("/students/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentCount")
      .collection("students")
      .findOneAndUpdate({ _id: objectID(req.params.id) }, { $set: req.body })
      .then((data) => {
        console.log("User data update successfully..!!");
        client.close();
        res.status(200).json({
          message: "User data updated..!!",
        });
      });
  });
});

app.delete("/students/:id", (req, res) => {
  mongoClient.connect(dbURL, (err, client) => {
    if (err) throw err;
    client
      .db("studentCount")
      .collection("students")
      .deleteOne({ _id: objectID(req.params.id) }, (err, data) => {
        if (err) throw err;
        client.close();
        res.status(200).json({
          message: "User deleted...!!",
        });
      });
  });
});
