const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const PREFIX = "!";

client.once("ready", () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const cmd = message.content.slice(PREFIX.length).trim();

  if (cmd === "join") {
    const vc = message.member.voice.channel;
    if (!vc) return message.reply("vào voice trước đã 😾");

    joinVoiceChannel({
      channelId: vc.id,
      guildId: vc.guild.id,
      adapterCreator: vc.guild.voiceAdapterCreator,
    });

    message.reply("bố m đã vào call rồi");
  }

  if (cmd === "leave") {
    const conn = getVoiceConnection(message.guild.id);
    if (!conn) return message.reply("t đang không ở call mà 🤨");

    conn.destroy();
    message.reply("t out rồi nha 👋");
  }
});

client.login(process.env.TOKEN);
