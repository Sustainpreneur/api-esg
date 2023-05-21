const router = require('express').Router();

const company_data = require('../controller/company_data_controller');

router.get('/allcompany', company_data.getAllCompanyData)
router.get('/companyById', company_data.getCompanyDataById)
router.get('/energycompany', company_data.getEnergyUtilitiesCompanyData)
router.get('/bankingCompany', company_data.getBankingCompanyData)
router.get('/search/:word', company_data.getSearchById)
router.get('/finance', company_data.getYFinance)
router.get('/financeToday',company_data.getYFinanceToday)

module.exports = router