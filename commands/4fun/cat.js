const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require('discord.js');
const { fetch } = require('undici');

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Wyświetl losowe zdjęcie kota.')
        .addBooleanOption(option => option.setName('ephemeral').setDescription('Czy wiadomość ma być widoczna dla wszystkich?')),
    async execute(interaction) {

        const ephemeral = interaction.options.getBoolean('ephemeral');

        if (ephemeral == null) {
            var ephemeralBoolean = true;
        } else {
            var ephemeralBoolean = ephemeral
        }

        let response = await fetch(
            `https://api.thecatapi.com/v1/images/search`
          );
        const data = await response.json();

        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search')
        } catch (error) {
            const embed = new EmbedBuilder()
                .setDescription(`Błąd podczas próby połączenia z API.`)
                .addFields(
                    { name: "ERROR", value: codeBlock(`${error}`) }
                )
                .setColor('Red')
                .setFooter({ text: `${interaction.user.username} | api.thecatapi.com`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()
      
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if (isEmptyObject(data)) {
            const embed = new EmbedBuilder()
                .setDescription(`API nie zwróciło daych.`)
                .setColor('Red')
                .setFooter({ text: `${interaction.user.username} | api.thecatapi.com`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()
      
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        let catImage = data[0].url;

        const cryptoEmbed = new EmbedBuilder()
                .setTitle('Meow~')
                .setColor('DarkBlue')
                .setFooter({ text: `${interaction.user.username} | api.thecatapi.com`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
                .setTimestamp()
                .setImage(catImage)
        await interaction.reply({ embeds: [cryptoEmbed], ephemeral: ephemeralBoolean })  
    },
};