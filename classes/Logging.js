const chalk = require('chalk');
const moment = require('moment');
class Logger {
	timestamp = `(${moment().format('HH-mm-ss')})`;
	constructor(a) {
		//console.log("Logger initialized")
	}
	debug(a) {
		const timestamp = `(${moment().format('HH-mm-ss')})`;
		process.stdout.write(`${timestamp} ${chalk.bgBlue("DEBUG")} ${a}\n`);
	}
	info(a) {
		const timestamp = `(${moment().format('HH-mm-ss')})`;
		process.stdout.write(`${timestamp} ${chalk.bgCyan("INFO")} ${a}\n`);
	}
	success(a) {
		const timestamp = `(${moment().format('HH-mm-ss')})`;
		process.stdout.write(`${timestamp} ${chalk.bgGreen("SUCCESS")} ${a}\n`);
	}
	warn(a) {
		const timestamp = `(${moment().format('HH-mm-ss')})`;
		process.stdout.write(`${timestamp} ${chalk.bgYellow("WARN")} ${a}\n`);
	}
	error(a) {
		const timestamp = `(${moment().format('HH-mm-ss')})`;
		process.stdout.write(`${timestamp} ${chalk.bgRed("ERROR")} ${a}\n`);
	}
}

module.exports = Logger;