const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

// >>> This creates a random ID for the user who typed the confession <<<
function generateRandomId() {
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
    const channelId = '1434469166609596528';
    const channelToSend = await interaction.client.channels.fetch(channelId);

    await interaction.deferReply({  flags: MessageFlags.Ephemeral }); // >> to only show thinking to user, saving identity from being exposed

    const confessionText = interaction.options.getString('confession');
    // >> creating the embed
    const confessionEmbed = new EmbedBuilder()
      .setColor('#FFD1DC')
      .setTitle(`⤿ 💌 Sweet Confession ❤︎ ${generateRandomId()}  𐔌՞. .՞𐦯`)
      .setDescription(`> ${confessionText}`)
      .setThumbnail('https://i.pinimg.com/736x/96/a0/2f/96a02f88d85e785ff171ee6229e75a56.jpg')
      .setFooter({
        text: `🌸 Proud Of You For Sharing, Take Care 𖹭  ⏔⏔⏔ ꒰ ᧔ෆ᧓ ꒱ ⏔⏔⏔`
      })

    await channelToSend.send({ // >> sends the embed in the confessions/venting channel
      embeds: [confessionEmbed]
    });

    await interaction.deleteReply(); // >> deletes the deferred reply
  }
}
