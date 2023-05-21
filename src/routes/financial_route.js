const router = require('express').Router();

const financial = require('../controller/financial_controller');

router.get('/stockToday/:symbol', financial.getStockToday);
router.get('/stock120DaysAgo/:symbol', financial.getStock120DaysAgo);
router.get('/getOptionStock/:symbol', financial.getOptionStock);

module.exports = router