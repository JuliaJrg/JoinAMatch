const { TOKEN } = require("./config.json");
const Discord = require("discord.js");

const bot = new Discord.Client({ intents: 3276799 });

bot.login(TOKEN);

bot.on("ready", async () => {
  console.log(`Connecté avec ${bot.user.tag}!`);
  bot.user.setActivity("Troller les gens");
});

const arrayResponse = [
  "PTDR T ki dans l'e-sport ?",
  "J't'emmerde je fais ce que je veux.",
  "*/add blokedex.",
  "Ratio plus palu.",
  "Casse toi ca devient génant.",
  "T ki ?",
  "Tu t'appel pas Kevin par hasard ?",
  "T'es qui pour me tag en fait ?",
  "Des fois je me sens bête, ensuite je te regarde et ca va mieux.",
  "J'aime le son de ton clavier quand tu la ferme.",
  "Ca joue sur un 60Hz et ca se dit gamer.",
];

bot.on("messageCreate", async (message) => {
  
  const random = arrayResponse[Math.floor(Math.random() * arrayResponse.length)];

  if (
    message.content.toLowerCase().includes("quoicoubeh") ||
    message.content.toLowerCase().includes("t'as les crampté") ||
    message.content.toLowerCase().includes("apagnan")
  ) {
    message.delete();    
  } else if (message.content.toLowerCase().includes("quoi")) {
    return message.reply("Feur");
  }
  if (
    message.content.toLowerCase().includes("hein")
  )
    return message.reply("Deux");
  if (message.mentions.users.size > 0) {
    if (message.mentions.users.has(bot.user.id))
      return message.reply(random);
  }
});
