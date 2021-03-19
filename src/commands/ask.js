const Discord = require('discord.js');


module.exports = async function Ask(msg, data, client) {

    console.log("ask");

    if (msg.author.id == data.get('moderator').id) {
        const question = msg.content.split(/ (.+)/)[1];
        const players = data.get("players");

        msg.channel.send(new Discord.MessageEmbed().setColor("#f5b042").addField(`:question: **${data.get("moderator").username} asked the question.**`, question));

        for (const player of players) {
            if (player.lifes > 0) {
                let user = await client.users.fetch(player.user.id);
                user.send(new Discord.MessageEmbed().setColor("#5cd1ff").setDescription(`:question: **${question}**`));
                player.awaitingAnwser = true;
                data.add('game.anwsersMissing', 1)
            }
        };

        data.set('players', players);

        var i = 0;
        /*var timeout = setInterval(function() {
            i++;
            if (i >= data.get('game.anwserTime')) {
                clearInterval(timeout);
                msg.channel.send(`:exclamation: **Time is up. No more anwsers are accepted.**`);
                data.set('game.anwsersMissing', 0);
                players.forEach(player => {
                    player.awaitingAnwser = false;
                });
                data.set('players', players);
            }
        }, 1000);*/
    }
    else msg.channel.send(`:exclamation: **Only ${data.get("moderator").username} as moderator can ask questions.**`);
}