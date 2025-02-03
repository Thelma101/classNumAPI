const express = require('express');
const app = express();
// const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5432;

app.use(express.json());
// app.use(cors());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`Application is running on PORT: ${PORT}`)
})