const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require('discord.js');
const { fetch } = require('undici');

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shiba')
        .setDescription('Wyświetl losowe zdjęcie shiby.')
        .addBooleanOption(option => option.setName('ephemeral').setDescription('Czy wiadomość ma być widoczna dla wszystkich?')),
    async execute(interaction) {

        const ephemeral = interaction.options.getBoolean('ephemeral');

        if (ephemeral == null) {
            var ephemeralBoolean = true;
        } else {
            var ephemeralBoolean = ephemeral
        }

        const response = await fetch(
            `https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true`
        );

        const data = await response.json();
        
        try {
            const response = await fetch('https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
        } catch (error) {
            const embed = new EmbedBuilder()
                .setDescription(`Błąd podczas próby połączenia z API.`)
                .addFields(
                    { name: "ERROR", value: codeBlock(`${error}`) }
                )
                .setColor('Red')
                .setFooter({ text: `${interaction.user.username} | shibe.online`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()
      
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (isEmptyObject(data)) {
            const embed = new EmbedBuilder()
                .setDescription(`API nie zwróciło daych.`)
                .setColor('Red')
                .setFooter({ text: `${interaction.user.username} | shibe.online`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()
      
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        let shibaImage = data[0];

        const cryptoEmbed = new EmbedBuilder()
                .setTitle('Woof!')
                .setColor('DarkBlue')
                .setFooter({ text: `${interaction.user.username} | shibe.online`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()
                .setImage(shibaImage)
        await interaction.reply({ embeds: [cryptoEmbed], ephemeral: ephemeralBoolean })  
    },
};