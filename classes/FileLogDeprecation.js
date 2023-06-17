const fs = require('fs');
const moment = require('moment')
class FileLogDeprecation {
	constructor() {
		process.on('SIGINT', async () => {
		const timestamp = `${moment().format('HH-mm-ss')}`;
		if (!fs.existsSync(`./logs/latest.log`)) return;
		fs.renameSync(`./logs/latest.log`, `./logs/log-${timestamp}.log`)
		})
		process.exit(0)
	}
}
module.exports = FileLogDeprecation