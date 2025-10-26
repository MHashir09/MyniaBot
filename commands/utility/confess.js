const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

// >>> This creates a random ID for the user who typed the confession <<<
function generateConfessionId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 4; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

// >>> This controls the command <<<
module.exports = {
  data: new SlashCommandBuilder().setName('confess').setDescription('Submit an anonymous confession')
    .addStringOption(option => option.setName('confession').setDescription('What would you like to confess?').setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({  flags: MessageFlags.Ephemeral }); // to only show thinking to user, saving identity from being exposed

    const confessionText = interaction.options.getString('confession');
    // creating the embed
    const confessionEmbed = new EmbedBuilder()
      .setColor('#FF69B4')
      .setTitle('𝜗ৎ Sneaky Confession 💗')
      .setDescription(`> ${confessionText}`)
      .setFooter({
        text: `🤍 You are strong and brave - ${generateConfessionId()}  ૮₍ ˶• ༝ •˶ ₎ა`
      })

    await interaction.channel.send({ // sends the embed in the channel the command was used on
      embeds: [confessionEmbed]
    });

    await interaction.deleteReply(); // deletes the deferred reply
  }
}
