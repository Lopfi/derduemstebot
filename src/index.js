const Discord = require('discord.js');
const client = new Discord.Client();
const { start, invite, info, ask  } = require('./commands');
var db = require('quick.db');
const secret = require("../secret.json");

var game = new db.table('game');
global.game = game;

client.on('ready', () => {
    client.user.setActivity("with stupid people");
  });

client.on('message', async msg => {
    if (!msg.author.bot && msg.channel.id == 819117644853805066) {
        var command = msg.content.trim().toLowerCase();
        if (command.startsWith("start")) {
            start(msg, game);
        }
        if (command.startsWith("invite")) {
            invite(msg, game);
        }
        if (command.startsWith("info")) {
            info(msg, game);
        }
        if (command.startsWith("ask")) {
            ask(msg, game, client);
        }
    }
});

client.on('message', async msg => {
    if (!msg.author.bot && msg.channel.type == "dm") {
        if (game.get('game.anwsersMissing') > 0) {
            const players = game.get('players');
            
            players.forEach(player => {
                console.log(player.anwser)
                console.log(player.awaitingAnwser)
                if (msg.author.id == player.user.id && player.awaitingAnwser) {
                    player.anwser = msg.content;
                    player.awaitingAnwser = false;
                    game.subtract('game.anwsersMissing', 1)
                }
                console.log(player.anwser)
            });
            game.set('players', players);
            if (game.get('game.anwsersMissing') <= 0) {
                const embed = new Discord.MessageEmbed();

                const players = game.get("players");

                embed.setColor("#5cd1ff");
                embed.setTitle("anwsers");
                if (players.length > 0) {
                    for (let i = 0; i < players.length; i++) {
                        embed.addField(players[i].name + players[i].emoji, players[i].anwser);
                    }
                }
                channel = await client.channels.fetch("819117644853805066");
                const message = await channel.send(embed);
                    for (let i = 0; i < players.length; i++) {
                        await message.react(players[i].emoji)
                        
                    }
                    message.awaitReactions(() => true, {max: players.length, time: 60000}) //await reactions max all players + moderator
                    .then(collected => {
                        console.log(collected.count)
                    });
            
                game.set('game.anwsersMissing', 0);
            }
        }
    }
});

client.login(secret.Discord.secret);