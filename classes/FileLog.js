const fs = require('fs');
class FileLog {
	constructor(data, path) {
		this.data = data;
		this.path = path;
		if (!fs.existsSync(`${this.path}/latest.log`)) {
			fs.writeFileSync(`${this.path}/latest.log`, '')
		}
		fs.appendFileSync(`${this.path}/latest.log`, `${this.data}\n`)
	}
}
module.exports = FileLog