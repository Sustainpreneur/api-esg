const yahooFinance = require('yahoo-finance2').default;

const today = new Date();
const daysAgo = 365;
const days10Ago = 10;
const msPerDay = 1000 * 60 * 60 * 24;

const date10Ago = new Date(today.getTime() - days10Ago * msPerDay);
const year10Ago = date10Ago.getFullYear();
const month10Ago = String(date10Ago.getMonth() + 1).padStart(2, '0');
const day10Ago = String(date10Ago.getDate()).padStart(2, '0');

const formattedDate10DaysAgo = `${year10Ago}-${month10Ago}-${day10Ago}`;

const dateAgo = new Date(today.getTime() - daysAgo * msPerDay);
const yearAgo = dateAgo.getFullYear();
const monthAgo = String(dateAgo.getMonth() + 1).padStart(2, '0');
const dayAgo = String(dateAgo.getDate()).padStart(2, '0');

const formattedDate120DaysAgo = `${yearAgo}-${monthAgo}-${dayAgo}`;

module.exports.getStockToday = async (req, res) => {
  const { symbol } = req.params;
  const queryOptions = {period1: formattedDate10DaysAgo, interval: '1d'};
  const results = await yahooFinance.historical(symbol, queryOptions);
  res.send(results);
}

module.exports.getStock120DaysAgo = async (req, res) => {
  const { symbol } = req.params;
  const queryOptions = {period1: formattedDate120DaysAgo, interval: '1d'};
  const results = await yahooFinance.historical(symbol, queryOptions);
  res.send(results);
}

module.exports.getOptionStock = async (req, res) => {
  const { symbol } = req.params;
  const result = await yahooFinance.quote(symbol, {fields: ["marketCap", "trailingPE", "averageDailyVolume3Month"]});
  res.send(result);
}