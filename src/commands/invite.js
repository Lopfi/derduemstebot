const Discord = require('discord.js');

module.exports = async function Invite (msg, game){

    console.log("invite");

    const newPlayer = msg.mentions.users.first();

    const message = await newPlayer.send(new Discord.MessageEmbed().setColor("#5cd1ff").setDescription(":question: **Do you want to join the game?**"));    
        await message.react("✅");
        await message.react("🟥");
        message.awaitReactions(() => true, {max: 1, time: 60000})
        .then(collected => {
            if (collected.first().emoji.name == "✅") {
                game.push('players', {user: newPlayer, name: newPlayer.username, lifes: 3, anwser: "", awaitingAnwser: false, emoji: game.get("emojis")[game.get("players").length].emoji});
                msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").setDescription(`:information_source: **${newPlayer.username} has accepted your invitation and joined the game.**`));
            }
            else  msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").setDescription(`:information_source: **${newPlayer.username} declined your invitation.**`));
            message.delete();
        });

}