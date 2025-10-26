const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    try {
      // >> To get channel ids
      const introChannelId = '1263070188589547541';
      const helpThreadId = '1388169643234955354';
      const rulesChannelId = '1263069602867445761';
      const rolesChannelId = '1263070845098655744';
      const resourcesChannelId = '1428076064982302781';
      const guideChannelId = '1419350655772135585';

      // >> To locate the channel from the channel cache and store it
      const introChannel = member.guild.channels.cache.get(introChannelId);
      if (!introChannel) return;

      // >> To create an embed for greeting user
      const greetingEmbed = new EmbedBuilder()
                           .setColor('#C8A2C8')
                           .setTitle(` ˚⊱🪷⊰˚ ᨰꫀᥣᥴ᥆ꩇꫀ ˚⊱🪷⊰˚`)
                           .setDescription(`> ╰┈➤ Please give us your good introduction here and read our respected <#${rulesChannelId}>  ฅ^>⩊<^ ฅ\n` + `> ╰┈➤ Dont forget to get cool <#${rolesChannelId}> ୭˚. ᵎᵎ\n` +
      `> ╰┈➤ If you need any kind of help then you can create a thread in <#${helpThreadId}> or in specific channels (˶ˆᗜˆ˵)\n` +
      `> ╰┈➤ Also if you are a beginner then check out our <#${guideChannelId}> and check out <#${resourcesChannelId} curated by us ≽^-⩊-^≼>\n` +
      `> ╰┈➤ Feel free to wander around the server, We hope you enjoy your stay here ପ꒰ ˶• ༝ •˶꒱ଓ 🌸🤍`
                            )
                            .setThumbnail(member.user.displayAvatarURL()) // shows user's avatar
                            .setImage("https://i.pinimg.com/736x/b4/69/ef/b469efd4f6b3f933fc45257307e2ba0c.jpg") // sets main image
                            .setFooter({text: '✦•┈๑⋅⋯ ⋯⋅๑┈•✦✦•┈๑⋅⋯ ⋯⋅๑┈•✦✦•┈๑⋅⋯ ⋯⋅๑┈•✦✦•┈๑⋅⋯ ⋯⋅๑┈•✦⋯⋅๑┈•✦'});

      // >> To send the embed
      await introChannel.send({
        content: `.𖥔 ݁ ˖❤︎ ── .✦ ${member} ── .✦\n`, // pings user
        embeds: [greetingEmbed]
      });

    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
  }
}
