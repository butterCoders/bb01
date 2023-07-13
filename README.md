<p align="center">
	<img src="/github/github_banner.png">
	<br><br>
	<a href="https://discord.gg/3tXztc7xCW"><img alt="Discord" src="https://img.shields.io/discord/1119363821379788822?label=Discord&logo=discord"></a>
</p>

# BB01
BB01 is a **discord selfbot** that will have some functions


# (N)FAQ (Not Frequently Asked Questions)


## What does BB01 stand for? 
BB01 stands for **B**utter**B**OT **01**

## Any way to contact?
Feel free to join discord: https://discord.gg/t5njV8cz

## How to run it?
Depedencies:
-	**Windows 7+ , Linux or macOS**
-	**Node.JS that supports d.js v13**
-	**Working Redis Server**
-	**A keyboard and mouse**
### actual tutorial
- Install the packages 
  * pnpm i
- copy redisConfig.json.example to redisConfig.json*1
  * fill it with your values
- copy config.env.example to config.env
  * provide the token **USER TOKEN** not bot token.
- type `node .`
  * The bot should be running.

## How do i exactly use this?
The default prefix for this selfbot is `b1=`
Due to the inflexibility of this program, you need to directly change the login details to the redis database in the index.js file. (bad practice)

The line we're talking about is located at line 11:
```js
globalThis.redis = new RedisHandler()
```
You can change it to this:
```js
globalThis.redis = new RedisHandler({
	host: "localhost",
	password: "YOUR_PASSWORD",
	port: 6379,
	maxRetriesPerRequest: 15
})
```
Please remember to change the login details.
# Removal of the database custom options information
It's located at the line 20 at the /classes/Database.js file

You can comment it out like in the following snippet of code:
```js
		} else {
			if (typeof customoptions !== Object) throw SyntaxError("customoptions must be an object")
			// cons.info("JRDS: Running with custom options")
			options = customoptions
		}
```
# ending
 ?|?
(°? ?7  
|?~?          
??_,)?
You don't have anything better to do, right?
