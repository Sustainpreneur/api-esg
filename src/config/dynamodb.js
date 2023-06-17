module.exports = {
	aws_table_name: 'stock_historical',
	aws_local_config: {
		//Provide details for local configuration
	},
	aws_remote_config: {
		accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_DYNAMO_SECRET_ACCESS_KEY,
		region: 'ap-southeast-1',
	},
}