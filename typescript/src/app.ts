// const express = require('express');
// const app = express();
// const cors = require('cors');
// const axios = require('axios');
// const dotenv = require('dotenv');
// const api = require('./index');

import app from './index';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Application Server is running on PORT: ${PORT}`)
});