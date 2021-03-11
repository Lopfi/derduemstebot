const Discord = require('discord.js');

module.exports = function Start (msg, game) {

    console.log("start");

    game.set('players', []);
    game.set('moderator', msg.author);
    game.set('emojis', [{emoji: "🐶", available: true}, 
                        {emoji: "🐱", available: false} , 
                        {emoji: "🐭", available: false}, 
                        {emoji: "🐹", available: false}, 
                        {emoji: "🐰", available: false}, 
                        {emoji: "🦊", available: false}, 
                        {emoji: "🐻", available: false}, 
                        {emoji: "🐼", available: false}]);
    game.set('game', {started: true});
    game.set('game', {anwsersMissing: 0});

    msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").setDescription(`:information_source: **${msg.author} has started a new game**`));
}