module.exports = (sequelize, DataTypes) => {
	const company_stock_history_transaction = sequelize.define(
		'company_stock_history_transaction',
		{
			history_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			company_master_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			open: {
				type: DataTypes.NUMBER,
			},
			high: {
				type: DataTypes.NUMBER,
			},
			low: {
				type: DataTypes.NUMBER,
			},
			close: {
				type: DataTypes.NUMBER,
			},
			adjclose: {
				type: DataTypes.NUMBER,
			},
			volume: {
				type: DataTypes.NUMBER,
			},
			date: {
				type: DataTypes.DATE,
			},
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	)

	return company_stock_history_transaction
}
