const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjkyMzQ3MTI5NTQwMTE2NTIx.XntRwA._RktAbUmEwQpPcYHMiH-H0yeWKg';
const ms = require('ms');
const PREFIX = '!';


bot.on('ready', () =>{
    console.log('This bot is online!');

    bot.user.setActivity('La primărie', {type: 'PLAYING'})
})

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('pong!')
            break;
        case 'info':
            if(args[1] === 'bobita'){
                message.channel.send('prost :[')
            }
            else 
            if(args[1] === 'tavi'){
                message.channel.send('pitic :<')
            }
            else{
                message.channel.send('ca tine!')
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('ERROR! Clear what?')
            message.channel.bulkDelete(args[1])
            break;
        case 'embed':
            const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('Player Name:', message.author.username)
            .setColor(0x1565C0)
            .setThumbnail(message.author.displayAvatarURL())
            message.channel.send(embed);
            break;
        case 'mute':



    }

   /* if (message.content === "HELLO"){
        message.reply('HELLO FRIEND! IM THE MAYOR ')
        
    }

    if (msg.content === "Iancule"){
        msg.reply('N-am tigari!!! ')
        
    } */

})

bot.login(token);