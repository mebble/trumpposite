require('dotenv').config();

const Twitter = require('twitter');

const trumpposite = require('./trumpposite');
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

const tweet = mock[2];
// console.log(JSON.stringify(tokenize(tweet)));
console.log(tweet);
// trumpposite(tweet)
    // .then(console.log)
    // .catch(console.error);
