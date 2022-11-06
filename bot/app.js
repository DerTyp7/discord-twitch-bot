const { Client, GatewayIntentBits } = require("discord.js");
const { registerCommands } = require("./commands");
const config = require("./config");
const { db, insertServer } = require("./database_handler");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

registerCommands();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  console.log();
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "setup") {
    insertServer(interaction.guildId, interaction.guild.ownerId);

    await interaction.reply("Pong!");
  }
});

client.login(config.token);
