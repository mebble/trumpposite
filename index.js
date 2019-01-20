require('dotenv').config();

const Twitter = require('twitter');
const axios = require('axios');
const mock = require('./mock.json');

const {
    CONSUMER_KEY,
    CONSUMER_SECRET,
    ACCESS_TOKEN_KEY,
    ACCESS_TOKEN_SECRET,
    http_proxy
} = process.env;

const bot = new Twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token_key: ACCESS_TOKEN_KEY,
    access_token_secret: ACCESS_TOKEN_SECRET,
    request_options: {
        proxy: http_proxy
    }
});

const params = {
    screen_name: 'realDonaldTrump',
    tweet_mode: 'extended'
};

async function trumpposite(tweet) {
    const words = tweet.split(' ');
    const promises = words.map(word => {
        return isAlphaNum(word)
            ? getAntonym(word)
            : Promise.resolve(word);
    });
    const changedWords = await Promise.all(promises);

    return changedWords.join(' ');
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

const tweet = mock[4];
trumpposite(tweet)
    .then(console.log)
    .catch(console.error);
