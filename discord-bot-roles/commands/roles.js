const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Ajoute ou supprime des roles via les réactions.'),
    async execute(interaction) {

        // Tableau des rangs de jeux
        const gamesTable = ["League of Legends", "Valorant", "Teamfight Tactics"];

        // Crée un embed pour afficher le menu de rôles des jeux
        const embedGames = new EmbedBuilder()
            .setTitle('Jeux')
            .setDescription('Choisissez vos jeux :')
            .addFields({name: " ", value: " "})
            .setColor(0x4352DB);

        // Configure la liste des rôles disponibles, avec leur emoji correspondant et leur ID
        const roles = {
            games: [
                { emoji: ':LoL:1086023704967913473', roleId: '1084847229036154992', name: 'LoL' }, // Lol
                { emoji: ':Valo:1123886368364433489', roleId: '1084779724770902066', name: 'Valo' }, // Valo
                { emoji: ':TfT:1123907766940078170', roleId: '1084781050166779924', name: 'TfT' }, // TfT
            ],
            rankLol: [
                // Roles de rang pour le jeu League of Legends
                { name: 'Iron', emoji: ':Iron:1123583377765830727', roleId: '1086217201415114794' }, // Iron
                { name: 'Bronze', emoji: ':Bronze:1123583368513192026', roleId: '1086217722167296000' }, // Bronze
                { name: 'Silver', emoji: ':Silver:1123583384111829083', roleId: '1086218171842834462' }, // Silver
                { name: 'Gold', emoji: ':Gold:1123583373986770954', roleId: '1086218485698412645' }, // Gold
                { name: 'Platinum', emoji: ':Platinum:1123583382836740166', roleId: '1086218068767801384' }, // Platinum
                { name: 'Diamond', emoji: ':Diamond:1123583372422283344', roleId: '1085867960167583834' }, // Diamond
                { name: 'Master', emoji: ':Master:1123583381310033940', roleId: '1086219323649040406' }, // Master
                { name: 'Grandmaster', emoji: ':Grandmaster:1123583376218128414', roleId: '1086219600053682267' }, // Grandmaster
                { name: 'Challenger', emoji: ':Challenger:1123583370241245204', roleId: '1086220017441448036' }, // Challenger
            ],
            rankTft: [
                // Roles de rang pour le jeu Teamfight Tactics
                { name: 'Iron', emoji: ':Iron:1123583377765830727', roleId: '1123663664503857172' }, // Iron
                { name: 'Bronze', emoji: ':Bronze:1123583368513192026', roleId: '1123663823614771220' }, // Bronze
                { name: 'Silver', emoji: ':Silver:1123583384111829083', roleId: '1123664544510787676' }, // Silver
                { name: 'Gold', emoji: ':Gold:1123583373986770954', roleId: '1123664921331236996' }, // Gold
                { name: 'Platinum', emoji: ':Platinum:1123583382836740166', roleId: '1123665178941206589' }, // Platinum
                { name: 'Diamond', emoji: ':Diamond:1123583372422283344', roleId: '1123665782547685376' }, // Diamond
                { name: 'Master', emoji: ':Master:1123583381310033940', roleId: '1123665252098248766' }, // Master
                { name: 'Grandmaster', emoji: ':Grandmaster:1123583376218128414', roleId: '1123665333924929566' }, // Grandmaster
                { name: 'Challenger', emoji: ':Challenger:1123583370241245204', roleId: '1123665470353055905' }, // Challenger
            ],
            rankValo: [
                { name: 'IronValo', emoji: ':IronValo:1123631273433378906', roleId: '1123631686408753172' }, // Iron
                { name: 'BronzeValo', emoji: ':BronzeValo:1123631265787170827', roleId: '1123632358038437968' }, // Bronze
                { name: 'SilverValo', emoji: ':SilverValo:1123631276092563456', roleId: '1123632063833198662' }, // Silver
                { name: 'GoldValo', emoji: ':GoldValo:1123631269851447306', roleId: '1123632951079485461' }, // Gold
                { name: 'PlatinumValo', emoji: ':PlatinumValo:1123631274838470746', roleId: '1123638831481110539' }, // Platinum
                { name: 'DiamondValo', emoji: ':DiamondValo:1123631268467314769', roleId: '1123639123991867392' }, // Diamond
                { name: 'Ascendant', emoji: ':Ascendant:1123926401049972798', roleId: '1123926932535390229' }, // Ascendant
                { name: 'ImmortalValo', emoji: ':ImmortalValo:1123949024127492116', roleId: '1123639518902366299' }, // Immortal
                { name: 'Radiant', emoji: ':Radiant:1123631278047121418', roleId: '1123639729263493203' }, // Radiant
            ],
        };

        for (let i = 0; i < roles["games"].length; i++) {
            const emoji = roles["games"][i].emoji;
            embedGames.addFields([
                { name: gamesTable[i], value: `<${emoji}>`, inline: true },
            ]);
        }

        // Envoie le message avec l'embed et réagit avec chaque emoji de rôle
        const message = await interaction.channel.send({ embeds: [embedGames] });

        for (const role of roles["games"]) {
            const emoji = role.emoji;
            await message.react(emoji);
        }

        // Crée un filtre pour les réactions
        const filter = (reaction, user) => {
            // Vérifie que la réaction est un emoji de rôle
            const isRoleEmoji = roles["games"].some(role => role.name === reaction.emoji.name);

            // Vérifie que l'utilisateur n'est pas un bot
            const isNotBot = !user.bot;

            return isRoleEmoji && isNotBot;
        }

        // Crée un collecteur pour les réactions
        const collector = message.createReactionCollector({ filter, dispose: true });


        // Ajoute ou retire le rôle correspondant à chaque réaction
        collector.on('collect', async (reaction, user) => {
            const role = roles["games"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.add(role.roleId);
        });

        collector.on('remove', (reaction, user) => {
            const role = roles["games"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.remove(role.roleId);
        });

        // Embed Message for Lol Rank
        const embedRankLol = new EmbedBuilder()
            .setTitle("Rangs classés de League of Legend")
            .setDescription("Choisissez votre rang :")
            .setColor(0x4352DB)
            .addFields({name: " ", value: " "});

        for (const role of roles["rankLol"]) {
            const emoji = role.emoji;
            const emojiName = role.name;
            embedRankLol.addFields([
                { name: emojiName, value: `<${emoji}>`, inline: true },
            ]);
        }

        const messageLolRank = await interaction.channel.send({embeds: [embedRankLol]});

        for(const role of roles["rankLol"]) {
            const emoji = role.emoji;
            await messageLolRank.react(emoji);
        }

        const filterRankLol = (reaction, user) => {
            // Vérifie que la réaction est un emoji de rôle
            const isRoleEmoji = roles["rankLol"].some(role => role.name === reaction.emoji.name);

            // Vérifie que l'utilisateur n'est pas un bot
            const isNotBot = !user.bot;

            return isRoleEmoji && isNotBot;
        }

        const lolRankCollector = messageLolRank.createReactionCollector({filterRankLol, dispose: true})

        lolRankCollector.on("collect", (reaction, user) => {
            const role = roles["rankLol"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.add(role.roleId);
        })
        lolRankCollector.on("remove", (reaction, user) => {
            const role = roles["rankLol"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.remove(role.roleId);
        })

        // Embed Message for Valorant Rank
        const embedRankValo = new EmbedBuilder()
            .setTitle("Rangs classés de Valorant")
            .setDescription("Choisissez votre rang :")
            .setColor(0x4352DB)
            .addFields({name: " ", value: " "});

        for (const role of roles["rankValo"]) {
            const emoji = role.emoji;
            const emojiName = role.name;
            embedRankValo.addFields([
                { name: emojiName, value: `<${emoji}>`, inline: true },
            ]);
        }

        const messageValoRank = await interaction.channel.send({embeds: [embedRankValo]});

        for(const role of roles["rankValo"]) {
            const emoji = role.emoji;
            await messageValoRank.react(emoji);
        }

        const filterValoRank = (reaction, user) => {
            // Vérifie que la réaction est un emoji de rôle
            const isRoleEmoji = roles["rankValo"].some(role => role.name === reaction.emoji.name);

            // Vérifie que l'utilisateur n'est pas un bot
            const isNotBot = !user.bot;

            return isRoleEmoji && isNotBot;
        }

        const valoRankCollector = messageValoRank.createReactionCollector({filterValoRank, dispose: true})

        valoRankCollector.on("collect", (reaction, user) => {
            const role = roles["rankValo"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.add(role.roleId);
        })
        valoRankCollector.on("remove", (reaction, user) => {
            const role = roles["rankValo"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.remove(role.roleId);
        })

        // Embed Message for Tft Rank
        const embedRankTft = new EmbedBuilder()
            .setTitle("Rangs classés de Teamfight Tactics")
            .setDescription("Choisissez votre rang :")
            .setColor(0x4352DB)
            .addFields({name: " ", value: " "});

        for (const role of roles["rankTft"]) {
            const emoji = role.emoji;
            const emojiName = role.name;
            embedRankTft.addFields([
                { name: emojiName, value: `<${emoji}>`, inline: true },
            ]);
        }

        const messageTftRank = await interaction.channel.send({embeds: [embedRankTft]});

        for(const role of roles["rankTft"]) {
            const emoji = role.emoji;
            await messageTftRank.react(emoji);
        }

        const filterRankTft = (reaction, user) => {
            // Vérifie que la réaction est un emoji de rôle
            const isRoleEmoji = roles["rankTft"].some(role => role.name === reaction.emoji.name);

            // Vérifie que l'utilisateur n'est pas un bot
            const isNotBot = !user.bot;

            return isRoleEmoji && isNotBot;
        }

        const tftRankCollector = messageTftRank.createReactionCollector({filterRankTft, dispose: true})

        tftRankCollector.on("collect", (reaction, user) => {
            const role = roles["rankTft"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.add(role.roleId);
        })
        tftRankCollector.on("remove", (reaction, user) => {
            const role = roles["rankTft"].find(role => role.name === reaction.emoji.name);
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.remove(role.roleId);
        })
    }
};