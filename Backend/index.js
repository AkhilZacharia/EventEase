
const express = require('express');
const app = new express();
const morgan = require('morgan');
const routes= require('./routes/router');
const userRoutes= require('./routes/userRoute');
const organizerRoutes= require('./routes/organizerRoute');
const loginRoutes= require('./routes/loginRoute');

const cors= require('cors');
app.use(cors());

app.use(morgan('dev'));
// app.use(express.static('public'));
app.use("/",routes);
app.use("/user",userRoutes);
app.use("/org",organizerRoutes);
app.use("/login",loginRoutes);


require('dotenv').config();
require('./db/connectiondb');

app.listen(process.env.PORT, () => {
    console.log(`Server is active on Port ${process.env.PORT}`);
});