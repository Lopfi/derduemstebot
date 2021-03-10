const discord = require('discord.js');
const client = new discord.Client();

module.exports = async function (interaction, game) {

    const player = interaction.data.options[0].value;
            console.log(player)
            client.users.fetch(player)
                .then(user => user.send("helo").catch(console.error))
                .catch(console.error);
    //await message.react("✅");
    
    //await message.react("🟥");
    /*message.awaitReactions(() => true, { max: 1, time: 60000 })
        .then(collected => {
            if (collected.first().emoji.name == "✅") {
                content = "User joined";
                game.push(players, player);
            }
            else {
                content = "User declined"
            }
            message.delete();
        });
    new discord.MessageEmbed().setColor("#5cd1ff").setDescription(":question: **Do you wannt to join?**")
        */
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 3,
            data: {
                content: "helo"
            }
        }
    });
}

