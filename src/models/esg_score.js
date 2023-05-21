module.exports = (sequelize, DataTypes) => {
  const esg_score = sequelize.define(
    'esg_score',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      symbol: {
        type: DataTypes.STRING(10)
        
      },
      Company_Name: {
        type: DataTypes.STRING(100)
        
      },
      ESG_text: {
        type: DataTypes.TEXT
        
      },
      ESG_labels: {
        type: DataTypes.STRING(50)
        
      },
      ESG_labels_actual: {
        type: DataTypes.STRING(3)
        
      },
      ESG_labels_pred: {
        type: DataTypes.STRING(3)
        
      },
      ESG_labels_actual_textual: {
        type: DataTypes.STRING(50)
        
      },
      ESG_labels_pred_textual: {
        type: DataTypes.STRING(50)
        
      },
      Topics_actual: {
        type: DataTypes.STRING(50)
        
      },
      SDGs: {
        type: DataTypes.STRING(1000)

      },
      BlackRock_checklist: {
        type: DataTypes.STRING(100)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )

  return esg_score
}

