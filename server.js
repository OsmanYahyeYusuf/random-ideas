const path = require('path');
const express = require('express');
require("dotenv").config();
const cors = require('cors')
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');


connectDB();

//express static
const app  = express();

app.use(express.static(path.join(__dirname , 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cros middleware
app.use(cors({
  origin: ['http://localhost:5000','http://localhost:3000'],
  Credential: true,
}))

app.get('/', (req,res)=>{
  res.send('hello')
});

const ideasRouter = require('./routes/ideas')
app.use('/api/ideas', ideasRouter)

app.listen(port, ()=> console.log(`Server running on port ${port}`));