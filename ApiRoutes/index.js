const router = require('express').Router();

// For each route include the actual location from the server
const routeFinder = require('./routeFinder');

router.use(routeFinder);

module.exports = router;
