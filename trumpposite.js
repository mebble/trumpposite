const axios = require('axios');
const { punctuation, isAlphaNum, tokenize } = require('./utils');

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
    const tokens = tokenize(tweet);
    const promises = tokens.map(token => {
        return isAlphaNum(token)
            ? getAntonym(token)
            : Promise.resolve(token);
    });
    const changedTokens = await Promise.all(promises);

    return changedTokens.join(' ');
};
