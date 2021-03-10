const discord = require('discord.js');
const client = new discord.Client();
const { start, invite } = require('./commands');
var db = require('quick.db');

client.on('ready', () => {
    console.log('ready');

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "start",
            description: "starts a new game"
        }
    });

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "invite",
            description: "Invites a player to the current game",

            options: [
                {
                    name: "name",
                    description: "Name of the person to invite",
                    type: 6,
                    required: true
                }
            ]
        }
    });

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "end",
            description: "Ends the current game"
        }
    });

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "ask",
            description: "Asks a question to all players",

            options: [
                {
                    name: "question",
                    description: "The question to ask everyone",
                    type: 3,
                    required: true
                }
            ]
        }
    });

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "status",
            description: "Shows the lifes of all games"
        }
    });

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "restart",
            description: "resets the lifes off all players"
        }
    });

    var game = new db.table('game')

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();

        switch (command) {
            case 'start': {
                start(interaction, game)
                break;
            }
            case 'invite': {
                invite(interaction, game)
                break;
            }
            default:
                break;
        }
    });
});

client.on('message', async msg => {
    if (msg.channel.type == "dm" && !msg.author.bot) {

    }
});

client.login(require('../config.json').token);