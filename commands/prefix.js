const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if(args[0] == "help"){
        message.reply(".prefix <Desired prefix here> (ᵔᴥᵔ)");
        return;
      }
    
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You do not have Permission.");
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) =>{
        if (err) console.log(err)
    });

    let sEmbed = new Discord.RichEmbed()
    .setColor("#ffc3ce")
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`);

    message.channel.send(sEmbed);
}

module.exports.help = {
     name: "prefix"
}