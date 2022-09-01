const { Temperament } = require('../db');
const getApi = require ('../controllers/getApi');
const { Router } = require('express');
const router = Router();


router.get('/', async (req, res) => {
    const dogsApi = await getApi();
    const dogsDb = dogsApi.map(e => e.temperament).join().split(',');
    const dogsTrim = dogsDb.map(e => e.trim());

    dogsTrim.forEach( e => {
        if(e !== ''){
            Temperament.findOrCreate({
                where: {
                    name: e
                }
            })
        }
    })

    const allTemperaments = await Temperament.findAll();

    return res.status(200).send(allTemperaments);
});


module.exports = router;