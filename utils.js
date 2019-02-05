const getRandomInt = (min, max) => {
    /**
     * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
     */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const isAlphaNum = (token) => {
    return /^[a-z0-9]+$/i.test(token);
};

const punctuation = (token) => {
    let xs, x;

    [ xs, x ] = [ token.slice(0, -1), token[token.length-1] ];
    if (!isAlphaNum(x)) return [ xs, x ];

    [ x, xs ] = [ token[0], token.slice(1) ];
    if (!isAlphaNum(x)) return [ x, xs ];

    return token;
};

const tokenize = (tweet) => {
    let tokens = tweet
        .split(' ')
        .map(punctuation);
    tokens = [].concat(...tokens);  // flatten grouped tokens
    return tokens;
};

module.exports = {
    getRandomInt,
    isAlphaNum,
    punctuation,
    tokenize
};
