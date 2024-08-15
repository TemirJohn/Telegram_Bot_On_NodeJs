// const { ChildProcess } = require('child_process');
const { request } = require('http');
var TelegramBot = require('node-telegram-bot-api');
var token = '7145787117:AAFhH-H8zDWHknuHoBqmYazHtcOay7kgd0k';
var bot = new TelegramBot(token, {polling: true});
var exec = require('child_process').exec;
var fs = require('fs');

bot.onText(/del (.+)/, function (msg, match) {
    var fromID = msg.from.id;
    exec('del ' +match[1]);
    bot.sendMessage(fromID, 'file "'+match[1]+'" delete');
  });

bot.onText(/copy (.+) (.+)/, function (msg, match) {
    var fromID = msg.from.id;
    exec('copy ' +match[1]+' '+ match[2]);
    bot.sendMessage(fromID, 'file "'+match[1]+'" copy in "'+match[2]+'"');
  });

bot.onText(/list (.+)/, function (msg, match) {
    var fromID = msg.from.id;
    fs.readdir(match[1], function(err, files) {
        if (err) bot.sendMessage(fromID, ('dude! that file not found or in her not have accept!'));

        var list = '';
        files.forEach(function(file){
            list += file + "\n";
        })
        bot.sendMessage(fromID, list);
    });

  });