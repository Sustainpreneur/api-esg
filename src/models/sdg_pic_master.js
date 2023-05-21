module.exports = (sequelize, DataTypes) => {
  const sdg_pic_master = sequelize.define(
    'sdg_pic_master',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING
        
      },
      file: {
        type: DataTypes.STRING
        
      },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  )

  return sdg_pic_master
}

