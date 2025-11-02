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
  data: new SlashCommandBuilder().setName('vent').setDescription('Vent your thoughts anonymously')
    .addStringOption(option => option.setName('vent-text').setDescription('What would you like to express?').setRequired(true)
    ),

  async execute(interaction) {
    const channelId = '1434469166609596528';
    const channelToSend = await interaction.client.channels.fetch(channelId);

    await interaction.deferReply({  flags: MessageFlags.Ephemeral });

    const ventText = interaction.options.getString('vent-text');
    // >> Building the embed
    const ventingEmbed = new EmbedBuilder()
      .setColor('#FFE5EC')
      .setTitle(`⤿ 💌 Venting Session ❤︎ ${generateRandomId()}  𐔌՞. .՞𐦯`)
      .setDescription(`> ${ventText}`)
      .setThumbnail('https://i.pinimg.com/736x/2a/63/bf/2a63bff9149d4ffa1c684e1d85015905.jpg')
      .setFooter({
        text: `🌷 You Are Not Alone In This, Stay Strong 𖹭  ⏔⏔⏔ ꒰ ᧔ෆ᧓ ꒱ ⏔⏔⏔`
      })

    await channelToSend.send({ // >> sends the embed in the confessions/venting channel
      embeds: [ventingEmbed]
    });

    await interaction.deleteReply(); // >> deletes the deferred reply
  }
}
