const Discord = require('discord.js');


module.exports = async function Ask(msg, game, client) {

    console.log("ask");

    const question = msg.content.split(/ (.+)/)[1];
    const players = game.get("players");

    msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").addField(`:question: **${game.get("moderator").username} asked the question.**`, question));

    for (const player of players) {
        let user = await client.users.fetch(player.user.id);
        user.send(new Discord.MessageEmbed().setColor("#5cd1ff").setDescription(`:question: **${question}**`));
        player.awaitingAnwser = true;
    };

    game.set('players', players);
    game.set('game.anwsersMissing', players.length);
}