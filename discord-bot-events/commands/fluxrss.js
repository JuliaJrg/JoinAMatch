require("dotenv").config();
const { EmbedBuilder, SlashCommandBuilder, ChannelManager, Guild} = require('discord.js');
const Parser = require('rss-parser');
const parser = new Parser();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('events')
        .setDescription('Affiche le flux rss')
        .addStringOption(option =>
            option.setName('game')
                .setDescription('Phrase to search for')
                .setRequired(true)
                .addChoices(
                    {name: "League of Legend", value: "lol"},
                    {name: "Valorant", value: "valo"},
                    {name: "Teamfight tactics", value: "tft"}
                )),
    async execute(interaction) {
        const game = await interaction.options.getString('game');


        //Je récupère l'id du channel en question, je vérifie si le parent correspond au channel en question et
        // j'envoie le message dans event du jeu en question
        const currentChannelId = await interaction.channel.id;

        const currentChannelParentId = await interaction.channel.parentId;
        const fetchCurrentChannelParent = await interaction.client.channels.fetch(currentChannelParentId);

        console.log(await interaction.guild.channels.fetch());


        const feeds = {
            'lol': {
                name: 'League of Legends',
                url: 'https://rss.app/feeds/lVFnOmiy2HJsSpu8.xml',
            },
            'valo': {
                name: 'Valorant',
                url: 'https://rss.app/feeds/b8LfbqTHiEedKpXX.xml',
            },
            'tft': {
                name: 'Teamfight Tactics',
                url: 'https://rss.app/feeds/TNtSVLhMLTrDBHRx.xml',
            },
        };

        const message = await interaction.channel.send({
            content: `***Bonjour à tous ! Je suis le bot Squad Events !***
                \nJe suis ici pour vous donner les dernières nouvelles du jeu : ***${feeds[game].name}***
                \nVous pourrez vous rendre vers la source en cliquant sur le lien directement`,
        })
        message.pin();

        // Afficher le premier message une fois avant toute les heures
        try {
            const feed = feeds[game];

            const parsedFeed = await parser.parseURL(feed.url);

            let limit = 0;
            const embedFields = [];
            for (const item of parsedFeed.items) {
                if (limit < 3) {
                    let contentSnippet = item.contentSnippet.length >= 1 ? item.contentSnippet : ' ';
                    let imageLink = item.hasOwnProperty("enclosure") ? item.enclosure.url : '';
                    let date = item.hasOwnProperty("pubDate") ? new Date(item.pubDate) : null;
                    if (game === "lol" && imageLink === '') {
                        imageLink = 'https://www.leagueoflegends.com/static/logo-1200-589b3ef693ce8a750fa4b4704f1e61f2.png';
                    } else if (game === "valo" && imageLink === '') {
                        imageLink = 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltf5db2e52934a300b/5fd2a7f7bed5bf30e30c5f19/ValorantWallpaper_Haven.jpg';
                    } else if (game === "tft" && imageLink === '') {
                        imageLink = 'https://static.mensup.fr/22/2022/11/photo_article/761192/299030/1200-L-tout-savoir-sur-les-champions-du-set-8-de-teamfight-tactics.jpg';
                    }
                    embedFields.push(
                        new EmbedBuilder()
                            .setTitle(item.title)
                            .setURL(item.link)
                            .setDescription(contentSnippet)
                            .setImage(imageLink)
                            .setTimestamp(date)
                            .setColor("#9E9A97")
                    )
                }
                limit++;
            }

            await interaction.channel.send({embeds: embedFields.map(item => item)});
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    }
};
