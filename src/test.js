const Discord = require('Discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('ready');

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "hello",
            description: "Replies with Hello World!"
        }
    });

    client.api.applications(client.user.id).guilds('396766980230873108').commands.post({
        data: {
            name: "echo",
            description: "Echos your text as an embed!",

            options: [
                {
                    name: "content",
                    description: "Content of the embed",
                    type: 6,
                    required: true
                }
            ]
        }
    });

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if (command == 'hello') {
            client.users.fetch(interaction.member.user.id)
                .then(user => user.send("hello").catch(console.error))
                .catch(console.error);

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Hello World!"
                    }
                }
            });
        }

        if (command == "echo") {
            const player = interaction.data.options[0].value;
            console.log(player)
            client.users.fetch(player)
                .then(user => user.send("helo").catch(console.error))
                .catch(console.error);

            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 3,
                    data: {
                        content: "helo"
                    }
                }
            });
        }
    });
});

async function createAPIMessage(interaction, content) {
    const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();

    return { ...apiMessage.data, files: apiMessage.files };
}

client.login(require('../config.json').token);