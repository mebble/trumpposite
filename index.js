require('dotenv').config();

const Twitter = require('twitter');
const trumpposite = require('./trumpposite');

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

bot.stream('statuses/filter', { follow: '1160721194' }, stream => {
    console.log('Stream is listening...');
    stream.on('data', tweet => {
        if (tweet.user.id_str !== '1160721194') return;

        const text = tweet.extended_tweet
            ? tweet.extended_tweet.full_text
            : tweet.text;
        console.log(`GOT at (${tweet.created_at}):\n${text}`);
        trumpposite(text)
            .then(opposite => {
                opposite = opposite.substring(0, 280);
                return bot.post('statuses/update', { status: opposite, tweet_mode: 'extended' });
            })
            .then(posted => {
                const text = posted.full_text || posted.text;
                console.log(`POSTED at (${posted.created_at}):\n${text}`);
            }, error => {
                const { code } = error[0];
                if (code === 261) {
                    console.log('Failed to POST due to rate limiting. Needs some caching!');
                }
            })
            .catch(error => console.error(error));
    });
    stream.on('error', error => {
        console.error(error);
    });
});
