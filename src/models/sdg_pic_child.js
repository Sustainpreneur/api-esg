module.exports = (sequelize, DataTypes) => {
  const sdg_pic_child = sequelize.define(
    'sdg_pic_child',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      pic_master_id: {
        type: DataTypes.INTEGER
        
      },
      esg_score_id: {
        type: DataTypes.INTEGER
        
      },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )

  return sdg_pic_child
}

