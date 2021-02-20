// const { RichEmbed } = require('discord.js');
// const schedule = require('node-schedule');
// const moment = require('moment');

// const dateRegex = new RegExp(
//     '/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$/'
// );
// const timeRegex = new RegExp('/^(0[0-9]|1[0-9]|2[0-3])h[0-5][0-9]$/');

// const imgUrl =
//     'https://www.mamytwink.com/upload/news/2020/juillet/29/tests-shadowlands-chateau-nathria.jpg';

// const infos = {
//     nm: {
//         color: 0x00ff00,
//         slug: 'Normal',
//     },
//     hm: {
//         color: 0xffa500,
//         slug: 'Héroïque',
//     },
//     mm: {
//         color: 0xff0000,
//         slug: 'Mythique',
//     },
// };

// const emotes = {
//     tank: '790038107017183263',
//     healer: '790038127590113310',
//     dps: '790036706027896852',
//     skull: ':skull:',
//     calendar: ':calendar:',
//     clock: ':alarm_clock:',
// };

// const role = message.guild.roles.find((role) => role.name === 'RL');

// if (!message.member.roles.has(role.id)) {
//     console.log('Member is not a RL!');
//     message.delete();
//     return;
// }

// const difficulty = args[0];
// const date = args[1];
// const time = args[2];

// console.log(args);

// if (difficulty === undefined || date === undefined || time === undefined) {
//     message.delete();
//     return;
// }

// if (difficulty !== 'nm' && difficulty !== 'hm' && difficulty !== 'mm') {
//     message.delete();
//     return;
// } else if (dateRegex.test(date)) {
//     message.delete();
//     message.reply(
//         "la date renseignée n'est pas correcte ! (format JJ/MM/AAAA)"
//     );
// } else if (timeRegex.test(time)) {
//     message.delete();
//     message.reply("l'heure renseignée n'est pas correcte ! (format HH:MM)");
// }

// const hours = time.split('h')[0];
// const minutes = time.split('h')[1];

// const embed = new RichEmbed()
//     .setColor(infos[difficulty].color)
//     .setImage(imgUrl)
//     .setTitle(
//         `Évènement raid : Château de Nathria (créé par ${message.author.username})`
//     )
//     .addField(`${emotes.skull} **Difficulté:**`, infos[difficulty].slug, true)
//     .addField(`${emotes.calendar} **Date:**`, date, true)
//     .addField(`${emotes.clock} **Heure:**`, `${hours}h${minutes}`, true);

// message.channel.send(embed);

// schedule.scheduleJob('0 0  * * *', function(){
//     message.channel.send('@tompeww, n\'oubliez pas de répondre à l\'évènement pour indiquer votre participation (ou non) ! :D');
// });
