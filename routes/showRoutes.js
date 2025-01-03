const router = require('express').Router();
const Show = require('../models/showModel');

router.post('/add-show',  async (req, res) => {
    try{
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({
            success: true,
            message: 'New show has been added!'
        });
        // console.log(req.body, res.success, res.message);
    }catch(err){
        res.send({
            status: false,
            message: err.message
        })
    }
});

// all shows by a theatre

router.post('/get-all-shows-by-theatre',  async (req, res) => {
    try{
        const shows = await Show.find({theatre: req.body.theatreId}).populate('movie')
        res.send({
            success: true,
            message: "All shows fetched",
            data: shows
        });
        // console.log(req.body, res.data, shows)
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});


router.put("/update-show",  async (req, res) => {
    try{
        
        await Show.findByIdAndUpdate(req.body.showId, req.body);

        const show = await Show.findById(req.body.showId);
        res.send({
            success: true,
            message: 'The show has been updated!'
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
})

// router.post('/get-all-theatres-by-movie',  async (req, res) => {
//     try {
//         const {movie, date} = req.body
//         const shows = await Show.find({ movie, date }).populate('theatre');
//         // format the data 
//         let uniqueTheatres = [];
//         shows.forEach(show => {

//             let isTheatre = uniqueTheatres.find(theatre => theatre._id === show.theatre._id);
//             if(!isTheatre){
//                 let showsOfThisTheatre = shows.filter(showObj => showObj.theatre._id == show.theatre._id);
//                 uniqueTheatres.push({...show.theatre._doc, shows: showsOfThisTheatre});
//             }
//         });
//         res.send({
//             success: true,
//             message: 'Shows by theatre',
//             data: uniqueTheatres
//         });
//         // console.log(req.body, res.success, res.message);
//     }catch(err){
//         res.send({
//             status: false,
//             message: err.message
//         })
//     }
// });

router.post('/get-all-theatres-by-movie', async (req, res) => {
    try {
        const { movie, date } = req.body;

        // Fetch all shows for the given movie and date
        const shows = await Show.find({ movie, date }).populate('theatre');

        // Create a map to group shows by unique theatres
        const uniqueTheatres = [];

        shows.forEach((show) => {
            // Skip if theatre is null or undefined
            if (!show.theatre) return;

            // Check if theatre is already in the unique list
            let existingTheatre = uniqueTheatres.find(theatre =>
                theatre._id.equals(show.theatre._id)
            );

            if (!existingTheatre) {
                // Group all shows for this theatre
                const showsOfThisTheatre = shows.filter(
                    (showObj) => showObj.theatre && showObj.theatre._id.equals(show.theatre._id)
                );

                // Add the theatre with its shows to the list
                uniqueTheatres.push({
                    ...show.theatre._doc,
                    shows: showsOfThisTheatre,
                });
            }
        });

        // Send response with formatted data
        res.status(200).send({
            success: true,
            message: 'Shows grouped by theatres',
            data: uniqueTheatres,
        });
    } catch (err) {
        // Log the error and send a response
        console.log("getAllTheatresByMoviesError", err.message);
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
});



router.post('/get-show-by-id',  async (req, res) => {
    try{
        const show = await Show.findById(req.body.id).populate('movie').populate('theatre');
        res.send({
            success: true,
            message: 'Show fetched!',
            data: show
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
});

// {"667a32497e2f25b5f0bd81e4": [{}, {}, {}], "667a32497e2f25b5f0bd81e1": [{}, {}, {}]}


module.exports = router;