const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const routerTemperament = require('./temperament');
const routerDogs = require('./dogs');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/temperaments', routerTemperament);
router.use('/dogs', routerDogs);


module.exports = router;
