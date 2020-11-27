//Discord imports
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.login('');

//fs imports
const fs = require('fs');

bot.on("message", function (msg) {
    //setting
    if(msg.content === "!take" && !Photocopier.user) {
        msg.channel.send("password?");
        msg.delete();
        Photocopier.user = true;
        return null;
    }
    if(msg.content === Photocopier.password && Photocopier.user) {
        Photocopier.user = msg.author.username;
        msg.channel.send("New user: " + Photocopier.user);
        msg.delete();
        return null;
    }
    if(msg.author.username === Photocopier.user) {
        if (msg.content === "!input") {
            Photocopier.input = msg.channel;
            msg.delete();
            return null;
        }
        if (msg.content === "!output") {
            Photocopier.output = msg.channel;
            msg.delete();
            return null;
        }
        if (msg.content === "!output2") {
            Photocopier.output2 = msg.channel;
            msg.delete();
            return null;
        }
        if (msg.content === "!ref") {
            Photocopier.ref = true;
            msg.delete();
            return null;
        }
        if (msg.content === "!lock") {
            Photocopier.user = false;
            msg.delete();
            return null;
        }
        if (msg.content === "!switch") {
            msg.channel.send("password?");
            Photocopier.user = true;
            msg.delete();
            return null;
        }
    }

    //saving
    if(Photocopier.input === msg.channel && Photocopier.output !== null && msg.author.username === Photocopier.user && msg.attachments.size > 0) {
        Photocopier.last = msg.attachments.array()[0];
        Photocopier.output.send(Photocopier.code, Photocopier.last);
        if(Photocopier.output2 !== null) {
            Photocopier.output2.send(Photocopier.last);
        }
        Photocopier.code++;
        return null;
    }
    if(msg.channel === Photocopier.output && msg.author.username === "Photocopier" && msg.attachments.size > 0) {
        let data = fs.readFileSync('photocopier/data.txt', function(err) {
            if (err) {
                return console.error(err);
            }}).toString();
        fs.writeFile('photocopier/data.txt', data + "\n" + String((Photocopier.code-1) + " " + msg.url), function(err) {
            if (err) {
                return console.error(err);
            }});
        return null;
    }
    if(msg.channel === Photocopier.output && msg.author.username === Photocopier.user && Photocopier.ref) {
        let data = fs.readFileSync('photocopier/data.txt', function(err) {
            if (err) {
                return console.error(err);
            }}).toString();
        let newDay = false;
        for(let i = 0; i < Photocopier.messages.length; i++) {
            if(Math.floor(Photocopier.code/Math.pow(10, 3)) > Math.floor(Photocopier.messages[i][0]/Math.pow(10, 3)) && Math.floor(Photocopier.messages[i][0]/Math.pow(10, 3)) > Math.pow(10, 7)) {
                newDay = true;
            }
        }
        if(newDay) { data += "\n" + Math.floor(Photocopier.code/Math.pow(10, 3)) + " " + msg.url;}
        fs.writeFile('photocopier/data.txt', data + "\n" + String((Math.floor(Photocopier.code/Math.pow(10, 2))) + " " + msg.url), function(err) {
            if (err) {
                return console.error(err);
            }});
        Photocopier.ref = false;
        return null;
    }

    //answering
    if (msg.channel !== Photocopier.output) {
        switch (msg.content) {
            case "?index": msg.channel.send(String(Photocopier.code)); msg.delete(); return null;
            case "?user": msg.channel.send(Photocopier.user); msg.delete(); return null;
            case "?last": msg.channel.send(Photocopier.last); msg.delete(); return null;
        }
    }

    //searching
    if (!isNaN(msg.content)) {
        for (let i = 0; i < Photocopier.messages.length; i++) {
            if (msg.content === Photocopier.messages[i][0]) {
                msg.channel.send(msg.author.username + ":\n" + Photocopier.messages[i][1]);
                msg.delete();
                return null;
            }
        }
    }
});

d = new Date();
s = 0; //math: 0, ph-c: 1, s2i: 2, ipt: 3, engl: 4, germ: 5, fr-p: 6
i = 0; //initial index

let Photocopier = {
    input: null,
    output: null,
    output2: null,
    code: d.getFullYear()*Math.pow(10, 7) + (d.getMonth()+1)*Math.pow(10, 5) + d.getDate()*Math.pow(10, 3) + s*Math.pow(10, 2) + i,
    ref: false,
    messages: [],
    last: "None",
    user: false,
    password: "",

    loadMessages: function() {
        this.messages = [];
        let data = fs.readFileSync('photocopier/data.txt', function(err) {
            if (err) {
                return console.error(err);
            }});
        data = data.toString().split("\n");
        for(let i = 0; i < data.length; i++) {
            this.messages.push(data[i].split(" "));
        }
    },

    generatePassword: function() {
        for(let i = 0; i < 4; i++) {
            this.password += String(Math.floor(Math.random()*10));
        }
        console.log(this.password);
    },

    init: function() {
        this.generatePassword();
        this.loadMessages();
    },
}

Photocopier.init();
