// equivalent of older: const express = require('express')
import * as express from "express";
import * as mongoose from "mongoose";
const app = express();

mongoose.connect(
  "mongodb://dmnkgrc:DLQNdT8BynRzFNy@ds121105.mlab.com:21105/starting11",
  { useNewUrlParser: true }
);

const schema = new mongoose.Schema(
  {
    players: [
      {
        name: String,
        number: Number,
        position: String
      }
    ]
  },
  { timestamps: { createdAt: "created_at" } }
);

const Team = mongoose.model("Team", schema);

// Allow any method from any host and log requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());

// Create team
app.post("/teams", (req, res) => {
  const team = new Team(req.body);
  return team.save((err, savedTeam) => {
    if (err) {
      res.status(500);
      return res.render("error", { error: err });
    }
    res.json(savedTeam);
  });
});

// Get all saved teams
app.get("/teams", (req, res) => {
  return Team.find((err, teams) => {
    if (err) {
      res.status(500);
      return res.render("error", { error: err });
    }
    res.json(teams);
  });
});

// start our server on port 4201
app.listen(4201, "127.0.0.1", () => {
  console.log("Server now listening on 4201");
});
