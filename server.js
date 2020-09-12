const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });


// Navigating Application

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
  });





//Creating & Adding to DB

//Create Workout
app.post("/api/workouts/", (req,res) =>{

    db.Workout.create({ name: "Workout" })
    .then(dbWorkout => {
      console.log(dbWorkout);
    })
    .catch(({message}) => {
      console.log(message);
    });
  
})

//Create Exercise
app.put("/api/workouts/:id", ({body}, res)=>{
    db.Exercise.create(body)
    .then(({_id})=> db.Workout.findOneAndUpdate({}, {$push: {exercises:_id}},{new: true}))
    .then(dbWorkout =>{
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    })
})



//Reading from DB

//reading workout from db  
app.get("/api/workouts", (req,res)=>{
db.Workout.find({})
.then(dbWorkout =>{
    res.json(dbWorkout)
})
.catch(err => {
    res.json(err);
})
})

//reading workouts for stats
app.get("/api/workouts/range", (req,res)=>{
db.Workout.find({})
.then(dbWorkout =>{
    res.json(dbWorkout)
})
.catch(err => {
    res.json(err);
})
})


// getting last workout
app.get("//")




  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });