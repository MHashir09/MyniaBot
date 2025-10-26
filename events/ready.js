const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady, // tell which event the file is for
  once: true, // makes it work only once
  execute(client) {
    console.log(`(${client.user.username}) is active now !!`);

    client.user.setPresence({
      activities: [{
        name: 'Thinking about life',
        type: 0
      }],
      status: 'online',
    });
  }
}
