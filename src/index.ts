import express, { Request, Response } from 'express';
const app = express();
import axios from 'axios';
import cors from 'cors';

app.use(express.json());
app.use(cors());

const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const isPerfect = (num: number): boolean => {
    if (num <= 1) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== sum / i) sum += num / i
        }
    }
    return sum === num;
}
const isAmrmstrong = (num: number): boolean => {
    const inputs = String(num).split('');
    const sum = inputs.reduce((prev, curr) => prev + Math.pow(Number(curr), inputs.length), 0);
    return sum === num;
}
const digitSum = (num: number): number => {
    return num.toString().split('').map(Number).reduce((acc, digit) => acc + digit, 0);
};

console.log(isAmrmstrong(371)); // true
console.log(isPerfect(91)); // true
console.log(isPrime(65)); // true


app.get('/api/classify-number', async (request: R, response) => {
    const numberParam = request.query.number;

    if (!numberParam || isNaN(Number(numberParam))) {
        return response.status(400).json({
            number: numberParam,
            error: 'Invalid number'
        });
    }

    const number = Number(numberParam);
    const properties: string[] = [];

    if (isPrime(number)) properties.push('prime');
    if (isPerfect(number)) properties.push('perfect');
    if (isAmrmstrong(number)) properties.push('armstrong');
    if (number % 2 !== 0) properties.push('odd');
    else properties.push('even');

    try {
        const funFactsAPI = await axios.get(`http://numbersapi.com/${number}/trivia?fragment=true&notfound=floor&json`)
        const funFact = funFactsAPI.data.text;

        const responseOutput = {
            number,
            is_prime: isPrime(number),
            is_perfect: isPerfect(number),
            digit_sum: digitSum(number),
            fun_fact: funFact,
        };
        response.status(200).json(responseOutput);
    } catch (error) {
        return response.status(500).json({
            error: 'Internal server error: Failed to fetch fun fact'
        });
    }
});

export default app;