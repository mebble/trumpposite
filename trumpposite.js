const axios = require('axios');

function getRandomInt(min, max) {
    /**
     * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
     */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function isAlphaNum(word) {
    return /^[a-z0-9]+$/i.test(word);
}

async function getAntonym(word) {
    /**
     * Use the Datamuse schema
     */
    const response = await axios.get(`https://api.datamuse.com/words?rel_ant=${word}`);
    const antonyms = response.data;
    return antonyms.length > 0
        ? antonyms[getRandomInt(0, antonyms.length)].word
        : word;
}

module.exports = async (tweet) => {
    const words = tweet.split(' ');
    const promises = words.map(word => {
        return isAlphaNum(word)
            ? getAntonym(word)
            : Promise.resolve(word);
    });
    const changedWords = await Promise.all(promises);

    return changedWords.join(' ');
}
