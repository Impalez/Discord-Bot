const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'NjkyMzQ3MTI5NTQwMTE2NTIx.Xn4yLQ.sbF5bSkiZH6pc67aAMmdmI_L-ec';
const ms = require('ms');
const PREFIX = '!';


const ytdl = require("ytdl-core");

var version ='1.2';
var servers = {};

bot.on('ready', () =>{
    console.log('This bot is online!');

    bot.user.setActivity('Fotbal galactic', {type: 'PLAYING'})
})

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('pong!')
            break;

        case 'info':
        
            break;

        case 'clear':
            if(!args[1]) return message.reply('ERROR! Clear what?')
            message.channel.bulkDelete(args[1])
            break;

        case 'me':
            const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('Player Name:', message.author.username)
            .setColor(0x1565C0)
            .setThumbnail(message.author.displayAvatarURL())
            message.channel.send(embed);
            break;

        case 'play':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));

                server.queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                message.channel.send("You need to provide a link!");
                return;
            }

            if(!message.member.voice.channel){
                message.channel.send("You must be in a channel!");
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
        
            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
                message.reply("playing now for you.");
            })


            break;

        case 'skip':
            var server = servers[message.guild.id];

            if(server.dispatcher) server.dispatcher.end();
            message.channel.send("Skipping the song")
            break;

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection){
                for(var i = server.queue.length - 1; i >=0; i--){
                    server.queue.splice(i,1);
                }

                server.dispatcher.end();
                message.channel.send("Leaving the voice channel.")
                console.log('Stopped the queue')
             }

            if(message.guild.connection) message.guild.voiceConnection.disconnect();
            break;


    }


})

bot.login(token);