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