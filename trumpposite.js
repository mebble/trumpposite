const axios = require('axios');
const { splitPunc, isAlphaNum } = require('./utils');

const getAntonym = async (word) => {
    /**
     * Use the Datamuse schema
     */
    const response = await axios.get(`https://api.datamuse.com/words?rel_ant=${word}`);
    const antonyms = response.data;
    return antonyms.length > 0
        ? antonyms[0].word
        : word;
}

module.exports = async (tweet) => {
    const tokens = tweet.split(' ');
    const promises = tokens
        .map(splitPunc)
        .map(async ([ punc1, word, punc2 ]) => {
            const result = isAlphaNum(word)
                ? await getAntonym(word)
                : word;
            return punc1 + result + punc2;
        });
    const changedTokens = await Promise.all(promises);
    return changedTokens.join(' ');
};
