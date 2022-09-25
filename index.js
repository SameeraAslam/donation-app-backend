const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const userTemplate = require("./models/users");
const Donation = require("./models/donation");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());
app.use(cors());

//mongoose.connect("mongodb+srv://sam12:<sameera12*>@mernstack.htmg7fx.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to database");
});

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/api/register", (req, res) => {
  console.log(req.body);
  try {
    userTemplate.findOne({ email: req.body.email }).exec((err, user) => {
      if (user) return res.status(400).json({ message: "User already exist" });

      const _user = new userTemplate({
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        pass: req.body.pass,
      });
      _user.save((error, data) => {
        if (error) res.status(400).json({ errtype: "mongodb error", error });
        if (data) {
          res.status(200).json(data);
        }
      });
    });
  } catch (err) {
    res.status(400).json({
      status: "errr",
      error: "duplicate",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await userTemplate.findOne({
    email: req.body.email,
  });
  if (user) {
    if (user.pass === req.body.pass) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        "secretKey123"
      );
      return res.status(200).json({ status: "okay", user: token });
    } else {
      return res.status(400).json({message:"Invalid Credentials.."});
    }
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/adddonation", async (req, res) => {
  const { donorName, donationType, phone, address } = req.body;

  if ((donorName, donationType, phone, address)) {
    const _donation = new Donation(req.body);
    _donation.save((error, data) => {
      if (error) res.status(400).json({ errtype: "internal error", error });
      if (data) {
        res.status(200).json({ data, message: "Thank you For your donation." });
      } else {
        res.status(400).json({ message: "something went wrong" });
      }
    });
  } else {
    return res.status(400).json("wrong args or missing args");
  }
});

app.get("/api/getdonation", async (req, res) => {
  Donation.find({}).exec((error, result) => {
    if (error) res.status(400).json({ errtype: "internal error", error });
    if (result) {
      res.status(200).json({ result });
    } else {
      res.status(400).json({ message: "something went wrong" });
    }
  });
});

// app.get("/api/quote", async (req, res) => {
//     const token = req.headers['x-access-token'];
//     try {

//         const decode = jwt.verify(token, 'secretKey123');
//         const email = decode.email;
//         const user = await userTemplate.findOne({
//             email: email,
//         });

//         return res.json({ status: "okay", quote: user.quote });
//     }
//     catch (error) {
//         console.log(error);
//         res.json({ status: "error", error: "invalid token" });
//     }
// })

// //to add a quote!
// app.post("/api/quote", async (req, res) => {
//     const token = req.headers['x-access-token'];
//     try {

//         const decode = jwt.verify(token, 'secretKey123');
//         const email = decode.email;
//         await userTemplate.updateOne(
//             { email: email },
//             { $set: { quote: req.body.quote } }
//         );

//         return res.json({ status: "okay" });
//     }
//     catch (error) {
//         console.log(error);
//         res.json({ status: "error", error: "invalid token" });
//     }
// })

//
app.listen(1337, () => {
  console.log("app is running on port 1337");
});
