module.exports = (sequelize, DataTypes) => {
  const company_data = sequelize.define(
    'company_data',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING
        
      },
      company_name_en: {
        type: DataTypes.STRING
        
      },
      company_name_th: {
        type: DataTypes.STRING
        
      },
      cg_score: {
        type: DataTypes.INTEGER
        
      },
      agm_leve: {
        type: DataTypes.INTEGER
        
      },
      thai_cac: {
        type: DataTypes.STRING
        
      },
      thsi: {
        type: DataTypes.STRING
        
      },
      industry_group: {
        type: DataTypes.STRING
        
      },
      set_mai_industry_group: {
        type: DataTypes.STRING
        
      },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )

  return company_data
}

