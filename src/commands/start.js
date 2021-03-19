const Discord = require('discord.js');

module.exports = function Start (msg, game) {

    console.log("start");

    console.log(new Date())
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
    game.set('game', {started: true, anwsersMissing: 0, lifes: 3, anwserTime: 60});
    
    msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").setDescription(`:information_source: **${msg.author} has started a new game**`));
}