const Discord = require('discord.js');

module.exports = function SetLifes (msg, data, args) {

    console.log("setLifes: " + args);

    data.set('game.lifes', args);
    
    msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").setDescription(`:information_source: **${msg.author} has set all the lifes to ${args}**`));
}