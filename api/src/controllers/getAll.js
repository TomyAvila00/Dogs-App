const getApi = require('./getApi');
const getDb = require('./getDb');

module.exports = async function getAll() {
    let dataApi = await getApi();
    let dataDb = await getDb();
    const all = dataApi.concat(dataDb);
    return all;
};