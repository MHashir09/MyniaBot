const { Events, MessageFlags } = require('discord.js'); // MessageFlags are special markers that tell discord how to treat messages

module.exports = {
	name: Events.InteractionCreate, // tell which event the file is for
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return; // discard anything that isnt chat-input command simply not a slash command

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction); // interaction variable sends info about the action of the user like what he just did
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral,
				});
			}
		}
	},
};
