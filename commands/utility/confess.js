const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { confessionChannelId } = require("../../config.json");

// ** It is useless to generate random IDs **
// function generateRandomId() {
// 	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// 	let id = '';
// 	for (let i = 0; i < 4; i++) {
// 		id += characters.charAt(Math.floor(Math.random() * characters.length));
// 	}
// 	return id;
// }

// >>> This controls the command <<<
module.exports = {
	data: new SlashCommandBuilder()
		.setName('confess')
		.setDescription('Submit an anonymous confession')
		.addStringOption(option => option.setName('confession').setDescription('What would you like to confess?').setRequired(true)),

	// 6 hours, since usage of command is not that much needed + prevents trolls from misusing it
	cooldown: 6 * 60 * 60,

	async execute(interaction) {
		// always wrap in try code to avoid any type of unexpected error
		try {
			// defer the reply first
			await interaction.deferReply({ flags: MessageFlags.Ephemeral }); // >> to only show thinking to user, saving identity from being exposed

			// add sanity checks
			const channelToSend = await interaction.client.channels.fetch(confessionChannelId);
			if (!channelToSend) {
				return interaction.editReply("Confession channel has been not set up yet. Please contact an admin to do so.");
			}

			const confessionText = interaction.options.getString('confession').trim();
			if (!confessionText || confessionText.length < 30) {
				return interaction.editReply("Please provide a valid confession. Required length for a confession is 30 characters.");
			}

			// >> creating the embed
			// removed non-conventional characters as they aren't visible on every device
			const confessionEmbed = new EmbedBuilder()
				.setColor('#FFD1DC')
				.setTitle(`💌 Sweet Confession`)
				.setDescription(`> ${confessionText}`)
				.setThumbnail('https://i.pinimg.com/736x/96/a0/2f/96a02f88d85e785ff171ee6229e75a56.jpg')
				.setFooter({
					text: '🌸 Proud Of You For Sharing, Take Care 🩵',
				});

			const confession = await channelToSend.send({ // >> sends the embed in the confessions/venting channel
				embeds: [confessionEmbed],
			});
			// add upvote and downvote system
			await confession.react('🔺');
			await confession.react('🔻');
			// start a thread to encourage discussion
			await confession.startThread({
				name: "Discussion"
			});

			// it's better to notify the user that the confession has been sent, since flags are set to ephemeral so user's identity is protected
			return interaction.editReply("Confession sent successfully!");
		} catch (err) {
			console.error("Error in sending confession:", err);
			return interaction.editReply("There was some unexpected error in sending the confession.");
		}
	},
};
