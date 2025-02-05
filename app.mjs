// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// const dotenv = require('dotenv');
// const app = express();

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
// app.use(express.json());
// app.use(cors());

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5432;
console.log(PORT);

// Helper function to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Helper function to check if a number is perfect
const isPerfect = (num) => {
    if (num <= 1) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return sum === num;
};

// Helper function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    const inputs = String(num).split('');
    const sum = inputs.reduce((prev, curr) => prev + Math.pow(Number(curr), inputs.length), 0);
    return sum === num;
};

// Helper function to calculate the sum of digits
const digitSum = (num) => {
    return num
        .toString()
        .split('')
        .map(Number)
        .reduce((acc, digit) => acc + digit, 0);
};

// API endpoint
app.get('/api/classify-number', async (request, response) => {
    const numberParam = request.query.number;
    if (!numberParam || isNaN(Number(numberParam))) {
        return response.status(400).json({
            number: numberParam,
            error: true
        });
    }
    const number = Number(numberParam);
    const properties = [];

    if (isPrime(number)) properties.push('prime');
    if (isPerfect(number)) properties.push('perfect');
    if (isArmstrong(number)) properties.push('armstrong');
    if (number % 2 !== 0) properties.push('odd');
    else properties.push('even');

    try {
        // Fetch fun fact from Numbers API
        const funFactAPI = await axios.get(`http://numbersapi.com/${number}?json`);
        const funFact = funFactAPI.data.text;

        const responseOutput = {
            number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            properties,
            // properties: isArmstrong(properties),
            digit_sum: digitSum(number),
            fun_fact: funFact,
        };
        console.log(responseOutput);
        response.status(200).json(responseOutput);
    } catch (error) {
        console.error('Error fetching fun fact:', error);
        response.status(500).json({
            error: 'Internal server error: Failed to fetch fun fact',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Application Server is running on PORT: ${PORT}`);
});