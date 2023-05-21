const { esg_score, sequelize } = require('../models')
const { QueryTypes } = require('sequelize')

module.exports.getEsgById = async (req, res) => {
  const { symbol } = req.params;

  try {
    const result = await esg_score.findAll({ where: { symbol }, group: ['id', 'symbol'] })
    res.send(result)
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports.getSDGById = async (req, res) => {
  const { symbol } = req.params;

  try {
    let query = `SELECT 
    es.*,
     (
       SELECT COALESCE(JSON_AGG(pic), '[]'::JSON)
          FROM
          (
            SELECT 
              spc.id,
              spc.pic_master_id,
              spc.esg_score_id,
              spm.*
            FROM sdg_pic_child spc
            LEFT JOIN sdg_pic_master spm ON spm.id = spc.pic_master_id
            WHERE spc.esg_score_id = es.id
          ) pic
        ) AS sdg_pic FROM esg_score es WHERE es.symbol = '${symbol}'`
    const result = await sequelize.query(query, { type: QueryTypes.SELECT, logging: false })
    res.send(result)
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
}