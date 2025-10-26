const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName('echo').setDescription('Replies with your input!')
    .addStringOption((option) => option.setName('input').setDescription('The input to echo back').setRequired(true) // this creates an option of type string
    ),

  async execute(interaction) {
      // Defer the reply immediately to prevent timeout
      await interaction.deferReply();

      // Get the input
      const input = interaction.options.getString('input');

      // Edit the deferred reply with the actual content
      await interaction.editReply({ content: input });
  }
}
