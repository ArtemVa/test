const router = require('express').Router();
const {login} = require('../controller/userLogin');
const controllerRegistration = require('../controller/userRegistration');
const refresh = require('../controller/updateTokens');
const middlewareAuth = require('../middleware/middlewareAuth');

router.post('/login', login);
router.post('/registration', middlewareAuth, controllerRegistration);
router.get('/refresh', refresh);

module.exports = router;