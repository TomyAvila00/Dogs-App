const { Dog, Temperament } = require('../db');
const getAll = require('../controllers/getAll');
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    const allDogs = await getAll();

    try {
        if(name){
            const filteredDogs = allDogs.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            if(filteredDogs.length){
                return res.status(200).send(filteredDogs);
            } else {
                return res.status(404).send('Dog not found');
            }
        } else {
            return res.status(200).send(allDogs);
        }
    } catch (error) {
        return res.status(404).json(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if(id){
            const allDogs = await getAll();
            const filteredDogs = allDogs.filter((e) => e.id.toString() === id);

            if(filteredDogs.length > 0){
                return res.status(200).send(filteredDogs);
            } else {
                res.status(404).send('Dog not found');
            }
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

router.post('/create', async (req, res) => {
    const { name, height, weight, life_span, temperament} = req.body;
    console.log(req.body)

    try {
        if(!name || !height || !weight){
            return res.status(400).send('Name, height and weight are required');
        } else {
            const createdDog = await Dog.create({
                name,
                height,
                weight,
                life_span,
                temperament
            });
            
            const dbTemperament = await Temperament.findAll({
                where: {
                    name: temperament
                }
            });
            await createdDog.addTemperament(dbTemperament);

            return res.status(200).send('Created!');
        };
    } catch (error) {
        res.status(404).json({msg: "Error" + error});
    }
})

module.exports = router;