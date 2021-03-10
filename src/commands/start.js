const discord = require('discord.js');
const client = new discord.Client();
const utils = require('../utils/createAPIMessage.js')


module.exports = function (interaction, game) {
    console.log(interaction)
    
    game.set('players', [] );

    const embed = new discord.MessageEmbed()
        .setTitle("You started a game")
        .setDescription("There are currently no players in your game. Use the invite command to invite them.")
        .setAuthor(interaction.member.user.username);

    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            embeds: embed
        }
    });
}

async function createAPIMessage(interaction, content) {
    const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
}