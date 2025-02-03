const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const api = require('./index');

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`)
    console.log(`Application Server is running on PORT: ${PORT}`)
})
