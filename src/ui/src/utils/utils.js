const { faker } = require('@faker-js/faker')

export const generateRandomLogin = () => {
    const name = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        username: name+'_'+lastName,
        password: faker.internet.password(),
    }
}

// Function to generate a random number between min and max or select max/min using useRandom
export const getRandomNumber = (min, max, useRandom = true) => {
 if (useRandom) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 } else {
    // Randomly choose between min or max
    return Math.random() < 0.5 ? min : max;
 }
};