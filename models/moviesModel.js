const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description :{type:String,required:true,unique:true},
    duration:{type:Number,required:true},
    genre:{type:String, required:true},
    language:{type:String, required:true},
    releaseDate:{type:Date, required:true},
    poster:{type:String, required:true},
},{timestamps:true});

const Movies = mongoose.model('movies',moviesSchema);
module.exports = Movies;
