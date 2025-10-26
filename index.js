// >>> This part requires discord.js classes and modules <<<
const fs = require('node:fs'); // this module reads files and do similar stuff like this
const path = require('node:path'); // this module builds path to folders and files etc
const { Client, Collection, GatewayIntentBits } = require('discord.js'); // requires important classes
const { token } = require('./config.json');

// >>> This part creates a new client instance <<<
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// >>> This part handles commands <<<
client.commands = new Collection(); // makes a collection to store all the commands by keys(names) and values
const foldersPath = path.join(__dirname, 'commands'); // builds the path to this folder
const commandFolders = fs.readdirSync(foldersPath); // returns the folder/files in this path

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder); // builds the path to that folder
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js')); // returns an array of all the files inside that folder with suffix ".js"

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file); // builds the path for that file
		const command = require(filePath); // loads the command file at that path for to use below
		// Set a new item in the Collection as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// >>> This part handle events <<<
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args)); // (...args) is simply whatever argument discord sends and ... unpacks those values and passes them as separate arguments to the execute function
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// >>> This part logs in the discord bot using the token<<<
client.login(token);
