const Redis = require('ioredis')
const chalk = require('chalk')
const lr = require('./Logging');
const cons = new lr()
const em2 = require('eventemitter2');
class Database extends em2 {
	/**
	 * 
	 * @param {import('.').RedisCustomOptions} customoptions 
	 */
	constructor(customoptions) {
		super();
		let options;
		let connectionRetries = 0;
		if (!customoptions) {
			cons.info("JRDS: Running with default options")
			options = require('../redisConfig.json');
		} else {
			if (typeof customoptions !== Object) throw SyntaxError("customoptions must be an object")
			cons.info("JRDS: Running with custom options")
			options = customoptions
		}
		this.redis = new Redis(options)
		this.redis.on('ready', async () => {
			cons.success("JRDS: Database connected")
			connectionRetries = 0;
		})
		this.redis.on('error', (err) => {
			connectionRetries += 1;
			cons.error("JRDS: Database error: " + err + " " + `(${connectionRetries}/15)`)
			if (connectionRetries === 15) { process.exit(1) }
		})

	}
	/**
	 * Updates the value of a column in the database table.
	 *
	 * @param {string} a - name of the column to be updated
	 * @param {any} data - new value of the column
	 */
	async set(a, data) {
		if (!a) throw new TypeError("Name not supplied.")
		if (!data)  throw new TypeError("Data not supplied.")
		if (typeof data === "number") { this.redis.set(a, `int:${data}`); } else {await this.redis.set(a, data)}
		return data;
	}
	/**
	 * @param {string} a - the key to get
	 */
	async get(a) {
		if (!a) throw new TypeError("Name not supplied.")
		const b = await this.redis.get(a)
		if (b === null) return null
		if (b.startsWith('int:')) { return parseFloat(b.slice(4)); } else {return await this.redis.get(a) }
	}
	/**
	 * @param {string} a - the key to delete
	 */
	async delete(a) {
		if (!a) throw new TypeError("Name not supplied.")
		return await this.redis.del(a)
	}
	/**
	 * @param {string} a - the key to add
	 * @param {number} num - the number to add
	 */
	async add(a, num) {
		if (!a) throw new TypeError("Name not supplied.")
		if (!num) throw new TypeError("Number not supplied.")
		if (typeof num !== "number") throw new TypeError("Number must be a number.")
		const actualData = await this.redis.get(a)
		if (actualData === null) {
			await this.redis.set(a, `int:${num}`)
			return num
		} else if (actualData.startsWith('int:')) {
			await this.redis.set(a, `int:${parseInt(actualData.slice(4)) + num}`)
			return parseInt(actualData.slice(4)) + num}
	}
	/**
	 * @param {string} a - the key to subtract
	 * @param {number} num - the number to subtract
	 */
	async sub(a, num) {
		if (!a) throw new TypeError("Name not supplied.")
		if (!num) throw new TypeError("Number not supplied.")
		if (typeof num !== "number") throw new TypeError("Number must be a number.")
		const actualData = await this.redis.get(a)
		if (actualData === null) {
			await this.redis.set(a, `int:${null-num}`)
			return num
		} else if (actualData.startsWith('int:')) {
			await this.redis.set(a, `int:${parseInt(actualData.slice(4)) - num}`)
			return parseInt(actualData.slice(4)) - num}
	}
}

module.exports = Database