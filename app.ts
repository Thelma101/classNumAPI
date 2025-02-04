// const express = require('express');
// const app = express();
// const cors = require('cors');
// const axios = require('axios');
// const dotenv = require('dotenv');
// const api = require('./index');
import express, {request, response} from 'express' ;
const app = express();
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './index';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/api/classify-number', (request, response) => {
    const numberParam = request.query.number;
})

app.listen(PORT, () => {
    // console.log(`Server is running on port ${PORT}`)
    console.log(`Application Server is running on PORT: ${PORT}`)
})


export default app;