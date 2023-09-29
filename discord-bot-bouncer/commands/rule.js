const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rule')
        .setDescription('Ajoute le règlement'),
    async execute(interaction) {
        const embedPresentation = new EmbedBuilder()
            .setTitle("Bienvenue sur le serveur Join A Match !")
            .setDescription(`Ici, notre objectif est de créer une communauté dynamique où les joueurs passionnés peuvent se retrouver, se défier et collaborer dans divers jeux compétitifs. Que tu sois un joueur expérimenté ou que tu découvres simplement le monde de la compétition, ce serveur est fait pour toi !

Voici ce que tu peux attendre de notre serveur :

🕹️. Centralisation des jeux : Notre serveur rassemble une multitude de jeux compétitifs populaires. Que tu préfères les FPS, les MOBA, les jeux de stratégie ou autres, tu trouveras certainement des joueurs partageant tes intérêts.

🔎. Recherche et invitation de joueurs : Tu peux utiliser nos canaux dédiés ainsi que nos bots pour inviter des joueurs à se joindre à toi pour des parties compétitives. Si tu cherches de nouveaux coéquipiers, n'hésite pas à publier une annonce détaillée ou utiliser la commande /mate dans nos salons dédié à la recherche de joueurs.

📊. Statistiques des joueurs : Nous offrons une fonctionnalité unique qui te permet de rechercher les statistiques des nouveaux joueurs qui se joignent à notre communauté. Que tu souhaites connaître leur expérience passée, leur classement ou leurs performances, tu auras accès à ces informations précieuses en faisant /tracker.

🔉. Rôles et canaux personnalisés : Nous utilisons des rôles pour rendre certaines parties du serveur visibles uniquement aux membres qui ont le rôle associé. Cela garantit que tu as accès aux informations et aux discussions les plus pertinentes pour tes jeux préférés.

Au plaisir de te voir parmi nous et de partager de nombreuses victoires ensemble ! 🙏`)
            .setColor(0xF90004);

        const embedBotsExplanation = new EmbedBuilder()
            .setTitle("Présentation de notre équipe de bots ! 🤖")
            .setColor(0xF90004)
            .setImage("https://cdn.discordapp.com/attachments/1087389243661353050/1126082856767213578/Squad_bots.png")
            .setDescription(`Bienvenue dans l'univers de nos bots ! Nous avons la fierté de vous présenter nos 6 compagnons virtuels :

1. Squad Bouncer 📄 : Notre bot de règlement. Il veille à ce que tous les membres acceptent les règles générales du serveur avant d'accéder au salon "général". Assurez-vous de bien lire et d'accepter ces règles pour pouvoir rejoindre la communauté.

2. Squad Events 🔔  : Ce bot est là pour vous tenir informé des derniers événements de jeux. Il affiche automatiquement les dernières actualités et annonces dans les salons correspondants. Restez à jour sur les compétitions, les tournois et autres événements passionnants !

3. Squad Finder 🔎 : Besoin de joueurs pour vos parties ? Notre bot Squad Finder est là pour vous aider ! Utilisez simplement la commande /mate pour trouver des coéquipiers, et spécifiez le nombre de joueurs souhaité ou nécessaires. Vous pouvez également rechercher des parties personnalisées avec la commande /pp. Trouver des partenaires de jeu n'a jamais été aussi simple !

4. Squad Picker 🤏 : Ce bot de rôles est conçu pour les jeux et les classements. Il vous donne accès à des parties spécifiques du Discord, vous permet de suivre vos jeux préférés, de rejoindre des canaux vocaux dédiés et d'interagir avec les communautés correspondantes. Obtenez les rôles qui correspondent à vos compétences et à vos intérêts !

5. Squad Tracker 👓 : Simplifiez votre recherche de statistiques de jeu avec notre bot Squad Tracker. Utilisez la commande /tracker pour obtenir les statistiques d'un joueur spécifique. Différentes options sont disponibles en fonction des jeux et de vos besoins. N'hésitez pas à consulter les commandes disponibles avec /help-tracker !

6. Squad Troller 😈 : Attention, ce bot est là pour un peu de folie ! Il peut être insupportable et malpoli, répondant avec "Feur" lorsque vous dites "quoi" et avec "deux" lorsque vous dites "hein". Nous vous laissons découvrir les autres surprises qu'il réserve...

Un septième bot est là pour créer votre propre channel vocal dont vous serez le propriétaire, ceci dans le but de ne jamais manquer de place sur notre serveur 😊. 

Nous espérons que nos bots ajouteront une touche de convivialité et de fonctionnalité à votre expérience sur notre serveur. Profitez de leur compagnie et amusez-vous bien !`)

        const embedRule = new EmbedBuilder()
            .setTitle("Règlement")
            .setDescription(`Nous sommes ravis de t'accueillir parmi nous. Que tu sois un membre existant ou un nouvel arrivant, ce serveur est un espace convivial où tu peux discuter, partager des idées et tisser de nouvelles amitiés.

Avant de commencer à explorer, voici quelques directives pour te familiariser avec notre communauté :

👓. Lis les règles : Assure-toi de prendre connaissance des règles du serveur. Elles sont là pour garantir une expérience agréable pour tous. Tu peux les retrouver dans ce salon à tout moment.

🏃. Participe activement : Rejoins les discussions, pose des questions, partage tes idées et invite des gens pour jouer avec toi. Ce serveur est un lieu d'échange où chacun est encouragé à contribuer.

🤝. Respecte les autres membres : Nous sommes fiers de créer une communauté bienveillante. Traite tous les membres avec respect, évite les conflits et les comportements nuisibles. Si tu rencontres un problème, n'hésite pas à contacter l'un des modérateurs.

🎮. Amuse-toi ! Avant tout, profite de ton temps ici. Discute, découvre de nouvelles passions et jeux, fais des rencontres et passe de bons moments en compagnie de personnes partageant les mêmes intérêts.

Si tu as des questions 💭 ou des préoccupations, n'hésite pas à contacter notre équipe de modération. Nous sommes là pour t'aider 🙂

Encore une fois, bienvenue dans notre communauté ! Nous espérons que tu te sentiras chez toi parmi nous et que tu passeras un excellent moment sur notre serveur Discord 😄 .`)
            .setColor(0xF90004)

        const roleMember = {
            name: "Membre",
            roleId: "1085187390651502643",
        };

        const emojiValid = "✅";

        embedRule.addFields({name: " ", value: " "});
        embedRule.addFields({name: roleMember.name, value: `<@&${roleMember.roleId}>`, inline: true});
        embedRule.addFields({name: "Valider", value: emojiValid, inline: true});

        const message = await interaction.channel.send({embeds: [embedPresentation, embedBotsExplanation, embedRule]});

        message.react(emojiValid);

        const filter = (reaction, user) => {
            return !user.bot;
        }

        const collector = message.createReactionCollector({filter, dispose: true});
        collector.on("collect", (reaction, user) => {
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.add(roleMember.roleId);
        })
    }
};
