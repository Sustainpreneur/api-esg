const router = require('express').Router();

router.use('/esg', require('./company_data_route'));
router.use('/esg-score',require('./esg_score_route'));
router.use('/financial',require('./financial_route'));
// router.use('/sdg',require('./sdg_route'));

module.exports = router