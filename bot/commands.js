const { REST, Routes } = require("discord.js");
const config = require("./config");

const commands = [
  {
    name: "setup",
    description: "Setup Twitch bot!",
  },
];

const rest = new REST({ version: "10" }).setToken(config.token);

async function registerCommands() {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(config.clientId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { registerCommands };
