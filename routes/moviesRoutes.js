const express = require("express");
const router = express.Router();
const Movie = require('../models/moviesModel');
const app = express();

//APIS
//add a movie
//get all movies
//update a movie
//delete a movie
//fetch a single movie using id

router.post('/add-movie',async(req,res)=>{
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success:true,
            message:'New movie has been added'
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message,
        }) 
    }
})


router.get('/get-all-movies',async(req,res)=>{
    try{
        const allMovies = await Movie.find();
        
        res.send({
            success:true,
            message:'All movies fetched',
            data:allMovies,
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message,
        }) 
    }
})

router.put('/update-movie',async(req,res)=>{
    try{
        const movie = await Movie.findByIdAndUpdate(req.body._id,req.body);
        await movie.save();
        res.send({
            success:true,
            message:'movie updated with desired changes',
            data:movie,
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message,
        }) 
    }
})

router.delete('/delete-movie',async(req,res)=>{
    try{
        await Movie.findByIdAndDelete(req.body._id);
        await movie.save();
        res.send({
            success:true,
            message:'movie deleted',
            
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message,
        }) 
    }
})

router.get('/movie/:id',async(req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        await movie.save();
        res.send({
            success:true,
            message:'fetched movie successfully',
            data:movie,
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message,
        }) 
    }
})

module.exports = router;