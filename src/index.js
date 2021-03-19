const Discord = require('discord.js');
const client = new Discord.Client();
const { start, invite, info, ask, restart, setLifes } = require('./commands');
var db = require('quick.db');
const config = require("../config.json");

var data = new db.table('game');

client.on('ready', () => {
    client.user.setActivity("with stupid people");
});

client.on('message', async msg => {
    if (!msg.author.bot && msg.channel.id == config.bot.channel) {
        let command = msg.content.split(" ")[0].substr(config.bot.prefix.length).toLowerCase();
        let args = msg.cleanContent.substr(command.length + config.bot.prefix.length);

        switch (command) {
            case "start":
                start(msg, data);
                break;

            case "invite":
                invite(msg, data);
                break;
            case "info":
                info(msg, data);
                break;
            case "ask":
                ask(msg, data, client);
                break;
            case "setlifes":
                setLifes(msg, data, args);
                break;
            case "restart":
                restart(msg, data);
            default:
                break;
        }
    }
});

client.on('message', async msg => {
    if (!msg.author.bot && msg.channel.type == "dm") {
        if (data.get('game.anwsersMissing') > 0) {
            const players = data.get('players');

            players.forEach(player => {
                if (msg.author.id == player.user.id && player.awaitingAnwser) {
                    player.anwser = msg.content;
                    player.awaitingAnwser = false;
                    data.subtract('game.anwsersMissing', 1)
                }
                console.log(player.anwser)
            });

            data.set('players', players);

            if (data.get('game.anwsersMissing') <= 0) {
                const embed = new Discord.MessageEmbed();

                const players = data.get("players");

                embed.setColor("#5cd1ff");
                embed.setTitle("anwsers");
                if (players.length > 0) {
                    for (let i = 0; i < players.length; i++) {
                        embed.addField(players[i].name + players[i].emoji, players[i].anwser);
                    }
                }
                channel = await client.channels.fetch("819931470919237652");
                const message = await channel.send(embed);
                for (let i = 0; i < players.length; i++) {
                    await message.react(players[i].emoji)

                }
                collected = await message.awaitReactions(() => true, { max: players.length, time: 60000 }) //await reactions max all players + moderator

                const reactions = collected.array();
                var highest = 0;
                var losers = [];

                reactions.forEach(reaction => {
                    if (reaction.count > highest) {
                        losers = [reaction];
                        highest = reaction.count;
                    }
                    else if (reaction.count == highest) {
                        losers.push(reaction);
                    }
                });
                const embed2 = new Discord.MessageEmbed();
                const embed3 = new Discord.MessageEmbed();

                embed3.setColor("#ff0000");
                embed3.setTitle("Deaths:headstone::")
                embed2.setColor("#5cd1ff");
                embed2.setTitle("Loser(s)");
                embed2.setDescription("We were stupid:")

                losers.forEach(reaction => {
                    players.forEach(player => {
                        if (reaction.emoji.name == player.emoji) {
                            embed2.addField(player.name, reaction.emoji.name)
                            player.lifes -= 1;
                            if (player.lifes <= 0) {
                                embed3.addField(player.name, ":headstone:");
                            }
                        }
                    })
                });
                channel.send(embed2);
                channel.send(embed3);
                data.set('players', players);
                data.set('game.anwsersMissing', 0);
            }
        }
    }
});

client.login(config.bot.token);