const Discord = require('discord.js');

module.exports = async function Start (msg, game) {

    console.log("info");

    const embed = new Discord.MessageEmbed();

    const players = game.get("players");

    embed.setColor("#5cd1ff");
    embed.addField("Moderator:", game.get('moderator').username);
    if (players.length > 0) {
        for (let i = 0; i < players.length; i++) {
            if (players[i].lifes > 0) {
            embed.addField(players[i].name, players[i].emoji + ":heart: " + players[i].lifes);
            }
        }
    }
    embed.addField("Missing anwsers:", game.get('game.anwsersMissing'));

    msg.channel.send(embed);
}