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
    for(let i= 2; i <= Math.sqrt(num); i++ ) {
        if (num % i === 0) {
            sum += i;
            if (i !== sum / i) sum += num /i
        }
    }
    return sum === num;
}

const isAmrmstrong= (sum: number): boolean => {
    return sum === sum.toString().split('').reduce((acc, curr) => 
        acc + Math.pow(Number(curr), 3), 0);
}

console.log(isAmrmstrong(371)); // true
console.log(isPerfect(91)); // true
console.log(isPrime(65)); // true
