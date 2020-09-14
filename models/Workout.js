const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
    default: Date.now()},
    exercises:[
        {
        type:{
            type:String,
            trim: true,
            require: true},

        name: {
        type:String,
        trim: true,
        require: true},
    
        duration: {
            type:Number,
            trim: true,
            require: true},

        distance: {
            type:Number
        },
    
        

        weight:  {
            type:Number
        },
        sets:  {
            type:Number
        },
        reps:  {
            type:Number
        }
          
        }
    ],
},
// sends virtual in json object when requested
{
    toJSON: {
        virtuals: true
    }
}
);

//create virtual property for total duration

WorkoutSchema.virtual("totalDuration")
.get(function() {
   return this.exercises.reduce((total, exercise)=>{
       return total + exercise.duration;
   }, 0) 
} );

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;