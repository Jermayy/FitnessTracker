const db = require("../models")
//Creating & Adding to DB
module.exports = (app)=> {
//Create Workout
app.post("/api/workouts/", (req,res) =>{

    db.Workout.create({})
    .then(dbWorkout => {
       res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
  
})


//Reading from DB

//reading workout from db  
app.get("/api/workouts", (req,res)=>{
db.Workout.find()
.then(dbWorkout =>{
   res.json(dbWorkout);
})
.catch(err => {
    res.json(err);
});
});

app.get("/api/workouts/range",(req, res)=> {
    db.Workout.find()
    .then(dbWorkouts =>{
        res.json(dbWorkouts);
    }).catch( err => {
        res.json(err);
    });
});




//Updating DB

app.post("/api/workouts/range",(req,res) => {
    db.Workout.create({})
    .then(dbWorkout => res.json(dbWorkout))
    .catch( err => {
        res.json(err)
    })
})


//add exercise to workout
app.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(params.id,                       
        {$push: {exercises:body }},
        { new: true, runValidators: true })
        .then(
     updatedWorkout => {
      res.json(updatedWorkout);
    }).catch(err => {
        res.json(err);
    })
});
                                
}