const Discord = require('discord.js');

module.exports = function Restart (msg, data) {

    console.log("restart");

    data.set('game.started', true);
    data.set('game.anwsersMissing', 0);

    const game = data.get('game');

    const players = data.get('players');

    players.forEach(player => {
        player.lifes = game.lifes;
        player.anwsersMissing = false;
        player.awnser = "";
    });

    data.set('players', players)

    msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").setDescription(`:information_source: **${msg.author} restarted the game**`));
}