const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/moviesRoutes');
const showRoutes = require('./routes/showRoutes.js');
const theatreRoutes = require('./routes/theatreRoutes.js');
const bookingRoute = require('./routes/bookingRoutes');

const app = express();
const userRoutes = require("./routes/userRoutes");
const mongoose = require('mongoose');

app.use(express.json());
require("dotenv").config();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Connected to db")).catch((err)=>console.log(err));
app.use('/api/users',userRoutes);
app.use('/api/movies',movieRoutes);
app.use('/api/shows',showRoutes);
app.use('/api/theatres',theatreRoutes);
app.use('/api/bookings', bookingRoute);
app.use(express.static('dist'));
app.listen(3000,()=>{
    console.log('server is connected on port 3000')
})

