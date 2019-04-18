const getRandomInt = (min, max) => {
    /**
     * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values
     */
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const isAlphaNum = token => {
    return /^[a-z0-9]+$/i.test(token);
};

const splitPunc = token => {
    if (!/[a-z0-9]/i.test(token)) return [ '', token, '' ];

    const puncs = '?!:;()';

    let [ i, j ] = [ 0, token.length-1 ];
    while (puncs.includes(token[i])) i++;
    while (puncs.includes(token[j])) j--;

    const punc1 = token.slice(0, i);
    const word = token.slice(i, j + 1);
    const punc2 = token.slice(j + 1);

    return [ punc1, word, punc2 ];
};

module.exports = {
    getRandomInt,
    isAlphaNum,
    splitPunc
};
