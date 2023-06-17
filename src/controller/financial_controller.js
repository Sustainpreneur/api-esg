const yahooFinance = require('yahoo-finance2').default

const AWS = require('aws-sdk')
const config = require('../config/dynamodb')
const { company_data, company_master_data, company_stock_history_transaction, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')

const today = new Date()
const daysAgo = 365
const days10Ago = 10
const msPerDay = 1000 * 60 * 60 * 24

const date10Ago = new Date(today.getTime() - days10Ago * msPerDay)
const year10Ago = date10Ago.getFullYear()
const month10Ago = String(date10Ago.getMonth() + 1).padStart(2, '0')
const day10Ago = String(date10Ago.getDate()).padStart(2, '0')

const formattedDate10DaysAgo = `${year10Ago}-${month10Ago}-${day10Ago}`

const dateAgo = new Date(today.getTime() - daysAgo * msPerDay)
const yearAgo = dateAgo.getFullYear()
const monthAgo = String(dateAgo.getMonth() + 1).padStart(2, '0')
const dayAgo = String(dateAgo.getDate()).padStart(2, '0')

const formattedDate120DaysAgo = `${yearAgo}-${monthAgo}-${dayAgo}`

module.exports.getStockToday = async (req, res) => {
	const { symbol } = req.params
	const queryOptions = { period1: formattedDate10DaysAgo, interval: '1d' }
	const results = await yahooFinance.historical(symbol, queryOptions)
	res.send(results)
}

module.exports.getStock120DaysAgo = async (req, res) => {
	const { symbol } = req.params
	const queryOptions = { period1: formattedDate120DaysAgo, interval: '1d' }
	const results = await yahooFinance.historical(symbol, queryOptions)
	res.send(results)
}

module.exports.getOptionStock = async (req, res) => {
  const { symbol } = req.params;
  const result = await yahooFinance.quote(symbol, {fields: ["marketCap", "trailingPE", "averageDailyVolume3Month"]});
  res.send(result);
}

module.exports.getStockBySector = async (req, res) => {
	try {
		const { sector } = req.params
    const format = { type: QueryTypes.SELECT, logging: false, bind: { sector } }
		let query = `
			select 
				cmd.symbol, 
				cmd.company_name_en, 
				cmd.company_name_th, 
				cmd.sector, 
				(
					select 
						coalesce (
							JSON_AGG(stock), 
							'[]' :: json
						) 
					from 
						(
							select 
								csht.* 
							from 
								company_stock_history_transaction csht 
							where 
								csht.company_master_id = cmd.company_master_id
						) stock
				) as stock_array 
			from 
				company_master_data cmd 
			where 
				cmd.sector = $sector
		`
    const result = await sequelize.query(query, format)
		res.send(result)
	} catch (error) {
		res.send(error)
	}
}

module.exports.getOptionStockYear = async (req, res) => {
	try {
		const { symbol } = req.params
    const format = { type: QueryTypes.SELECT, logging: false, bind: { symbol } }

		let query = `
			SELECT 
				cmd.*, 
				(
					SELECT 
						Coalesce (
							Json_agg(stock), 
							'[]' :: json
						) 
					FROM 
						(
							SELECT 
								csht.* 
							FROM 
								company_stock_history_transaction csht 
							WHERE 
								csht.company_master_id = cmd.company_master_id
						) stock
				) AS stock_array 
			FROM 
				company_master_data cmd 
			WHERE 
				cmd.symbol = $symbol
		`
    const result = await sequelize.query(query, format)
		res.send(result)
	} catch (error) {
		res.send(error)
	}
}
// module.exports.getStockYearAgo = asyn (req, res) => {
// 	try {
		
// 	} catch (error) {
		
// 	}
// }

// module.exports.getOptionStock = async (req, res) => {
// 	AWS.config.update(config.aws_remote_config)

// 	const docClient = new AWS.DynamoDB.DocumentClient()

// 	const params = {
// 		TableName: config.aws_table_name,
// 	}

// 	docClient.scan(params, function (err, data) {
// 		if (err) {
// 			console.log(err)
// 			res.send({
// 				success: false,
// 				message: err,
// 			})
// 		} else {
// 			res.send({
// 				data
// 			})
// 		}
// 	})
// }
