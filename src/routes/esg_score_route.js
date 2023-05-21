const router = require('express').Router();

const esg_score = require('../controller/esg_score_controller');

router.get('/esgScoreById/:symbol', esg_score.getEsgById);
router.get('/sdgByid/:symbol', esg_score.getSDGById);

// router.get('/allcompany', company_data.getAllCompanyData)
// router.get('/companyById', company_data.getCompanyDataById)
// router.get('/Energycompany', company_data.getEnergyUtilitiesCompanyData)
// router.get('/search', company_data.getSearchById)
// router.get('/finance', company_data.getYFinance)
// router.get('/financeToday',company_data.getYFinanceToday)

module.exports = router