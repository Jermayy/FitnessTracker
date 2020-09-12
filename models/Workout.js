

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    date:Date.now(),
    exercises:[
        {
            type: Schema.Types.ObjectId,
            ref:"Exercise"
        }
    ]


})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;