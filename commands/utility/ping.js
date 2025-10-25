const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping-me').setDescription('Replies with Haiii ^w^'),
	async execute(interaction) {
		await interaction.reply('Haiii ^w^');
	},
};
