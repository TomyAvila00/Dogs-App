const { Dog, Temperament } = require('../db');

module.exports = async function getDb() {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            throught: {attributes: []} 
        }
    })
};