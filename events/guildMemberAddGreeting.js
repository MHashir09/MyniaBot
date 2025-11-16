const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    try {
      const greetingChannelId = '1432401935549468814';
      const membCount = member.guild.memberCount;

      // >> To locate the channel from the channel cache and store it
      const greetingChannel = member.guild.channels.cache.get(greetingChannelId);
      if (!greetingChannel) return;

      // >> To create an embed for greeting user
      const greetingEmbed = new EmbedBuilder()
                           .setColor('#C8A2C8')
                           .setTitle(` ˚⊱🪷⊰˚ ᨰꫀᥣᥴ᥆ꩇꫀ ˚⊱🪷⊰˚`)
                           .setDescription(`**Konichiwa ${member.displayName}**,\n We are so happy for you joining our community  🌺\n` +
                            `\n` +
                            `Kindly do the following before you chat  💬\n` +
                            `\n` +
                            ` ┈➤ Give us your good [introduction](https://discord.com/channels/1263067254153805905/1263070188589547541)  🎀\n`+                            `┈➤ Get yourself some cool [roles](https://discord.com/channels/1263067254153805905/1263070845098655744)  🧸\n`+                             `┈➤ See this channel for more server [info](https://discord.com/channels/1263067254153805905/1437758834935464020)  🌸\n`+
                            `\n`+
                            `Feel free to wander around the server 🦋\n We hope you enjoy your stay here ପ꒰ ˶• ༝ •˶꒱ଓ  🤍`
                            )
                            .setThumbnail(member.user.displayAvatarURL()) // shows user's avatar
                            .setImage("https://scontent.flhe42-1.fna.fbcdn.net/v/t1.15752-9/582065895_2596366044064725_7119358415601681448_n.png?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_ohc=HLZ4LAuX8hIQ7kNvwEDFHSr&_nc_oc=Adn3Y5Eda99z5CUEO096bNYwOBemEb4kcOvoGeK2UnR4a9cfNmlafLpDyfyxhEzDp9Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.flhe42-1.fna&oh=03_Q7cD3wGy9niStnzO8qv_9E5lLpgV7XeRwXKlAMcD8K8HgzKjIA&oe=6940D67D") // sets main image
                            .setFooter({text: `Member-${membCount} ✦•┈๑⋅⋯ ⋯⋅๑┈•✦✦•┈๑⋅⋯ ⋯⋅๑┈•✦✦•┈๑⋅⋯ ⋯⋅๑┈•✦✦•┈๑⋅⋯ ⋯⋅๑┈•`});

      // >> To send the embed
      await greetingChannel.send({
        content: `.𖥔 ݁ ˖ ── . ${member} ── .✦\n`, // pings user
        embeds: [greetingEmbed]
      });

    } catch (error) {
        console.error('Error sending welcome message:', error);
    }
  }
}
