const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { company_data, sequelize } = require('../models');
var yahooFinance = require('yahoo-finance');

const today = new Date();
const daysAgo = 365;
const days10Ago = 10;
const msPerDay = 1000 * 60 * 60 * 24; // milliseconds per day

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const formattedDateToday = `${year}-${month}-${day}`;

const dateAgo = new Date(today.getTime() - daysAgo * msPerDay);
const yearAgo = dateAgo.getFullYear();
const monthAgo = String(dateAgo.getMonth() + 1).padStart(2, '0');
const dayAgo = String(dateAgo.getDate()).padStart(2, '0');

const formattedDate120DaysAgo = `${yearAgo}-${monthAgo}-${dayAgo}`;

const date10Ago = new Date(today.getTime() - days10Ago * msPerDay);
const year10Ago = date10Ago.getFullYear();
const month10Ago = String(date10Ago.getMonth() + 1).padStart(2, '0');
const day10Ago = String(date10Ago.getDate()).padStart(2, '0');

const formattedDate10DaysAgo = `${year10Ago}-${month10Ago}-${day10Ago}`;


module.exports.getAllCompanyData = async (req, res) => {
  try {
    const result = await company_data.findAll({ where: {} })
    res.send(result)
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports.getCompanyDataById = async (req, res) => {
  const {id} = req.query;
  try {
    const company = await company_data.findOne({ where: { id } });

    if (company === null) {
      res.status(404).send("Company not found");
    } else {
      res.send(company)
    }
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
}


module.exports.getEnergyUtilitiesCompanyData = async (req, res) => {
  try {
    const result = await company_data.findAll({ where: { industry_group: 'Energy & Utilities' }, limit: 5 })
    res.send(result)
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports.getBankingCompanyData = async (req, res) => {
  try {
    const result = await company_data.findAll({ where: { industry_group: 'Banking' }, limit: 5 })
    res.send(result)
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports.getSearchById = async (req, res) => {
  const { word } = req.params;
  try {
    const result = await company_data.findAll({
      where: {
        symbol: {
          [Op.like]: `${word}%`
        }
      }
    })
    res.send(result);
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports.getYFinance = async (req, res) => {
  const symbol = req.query.symbol
  yahooFinance.historical({
    symbol: symbol,
    from: formattedDate120DaysAgo,
    to: formattedDateToday,
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, function (err, quotes) {
    console.log(quotes)
    res.send(quotes)
  });
}

module.exports.getYFinanceToday = async (req, res) => {
  const symbol = req.query.symbol
  yahooFinance.historical({
    symbol: symbol,
    from: formattedDate10DaysAgo,
    to: formattedDateToday,
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, function (err, quotes) {
    console.log(quotes)
    res.send(quotes)
  });
}