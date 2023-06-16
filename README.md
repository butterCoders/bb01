<p align="center">
	<img width="400" src="/github/github_banner.png">
	<br><br>
	<a href="https://discord.gg/3tXztc7xCW"><img alt="Discord" src="https://img.shields.io/discord/1119363821379788822?label=Discord&logo=discord"></a>
</p>
# BB01
BB01 is a **discord selfbot** that will have some functions


# (N)FAQ (Not Frequently Asked Questions)
What BB01 stands for? ButterBOT 01

# Any way to contact?
Feel free to join discord: https://discord.gg/t5njV8cz

# How to run it??
Depedencies:
	**Windows 11/10, Linux or macOS**
	**Node.JS that supports d.js v13**
	**Working Redis Server**
	**A keyboard and mouse**
# actual tutorial
- Install the packages 
  * yarn
  * npm i
  * pnpm i
- copy redisConfig.json.example to redisConfig.json*1
  * fill it with your values
- copy config.env.example to config.env
  * provide the token **USER TOKEN** not bot token.
- type `node .`
  * The bot should be running.

# the end
the bot default prefix is `b1=`
*1 Alternatively you can setup redis directly in index file
```js
globalThis.redis = new RedisHandler()
```
change it to:
```js
globalThis.redis = new RedisHandler({
	host: "localhost",
	password: "YOUR_PASSWORD",
	port: 6379,
	maxRetriesPerRequest: 15
})
```
Remember: Redis database handler when you provided a "custom" configuration log it into console.
# removal of this shit
- go to classes and Database.js
- find line 20
- if you want to disable it need to look like this:
```js
		} else {
			if (typeof customoptions !== Object) throw SyntaxError("customoptions must be an object")
			// cons.info("JRDS: Running with custom options")
			options = customoptions
		}
```
# real the end
If you found any issues, or you want contribute to the project, use Issues and Pull Requests.
You can modify the project freely.