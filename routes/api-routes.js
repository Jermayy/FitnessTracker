const db = require("../models")
//Creating & Adding to DB
module.exports = (app)=> {
//Create Workout
app.post("/api/workouts/", (req,res) =>{

    db.Workout.create({})
    .then(dbWorkout => {
      console.log(dbWorkout);
    })
    .catch(({message}) => {
      console.log(message);
    });
  
})

//Create Exercise
// app.put("/api/workouts/:workout", ({body}, res)=>{
//     db.Exercise.create(body)
//     .then(({_id})=> db.Workout.findById({_id}, {$push: {exercises:_id}},{new: true}))
//     .then(dbWorkout =>{
//         res.json(dbWorkout);
//     })
//     .catch(err => {
//         res.json(err);
//     })
// })

app.put("/api/workouts/:workout", ({ params, body }, res) => {
    db.Workout.findOneAndUpdate({ _id: params.id},
                                {$push: {excercises:body }},
                                { upsert: true, useFindandModify:false},
                                updatedWorkout => {
                                    res.json(updatedWorkout);
                                })
});



//Reading from DB

//reading workout from db  
app.get("/api/workouts", (req,res)=>{
db.Workout.find({})
.then(dbWorkout =>{
    console.log(dbWorkout);
    res.json(dbWorkout);
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

}