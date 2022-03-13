var mineflayer = require('mineflayer');
var pass = "12345"; //Authme plugini şifresi (Plugin yoksa silmeyin)
var ayar = {
  host: "ult12.falix.gg", //Sunucunuzun ipsi
  port: process.env.port || 39132, //Değiştirme!!!
  username: "ONIONBOT1", //Botun ismi Kafanıza Göre
  version: "1.18.1" //Değiştirme!!!
  
};

var bot = mineflayer.createBot(ayar);


bot.on('chat', function(username, message) {
  if (username === bot.username) return;
  function intervalFunc() {
    bot.setControlState('forward', true)
  }
  setInterval(intervalFunc,7000);
  console.log('Interval Message!');
  bot.chat('/login '+ pass);
});

bindEvents(bot);
function bindEvents(bot) {
  
  bot.on('error', function(err) {
    console.log("Error!");
  });
  
  bot.on('end', function() {
    console.log("End!");
    setTimeout(relog, 5000);
  });
  
  function relog() {
    console.log("Relogin!");
    bot = mineflayer.createBot(ayar);
    
    bot.on('chat', function(username, message) {
      if (username === bot.username) return;
      console.log("Relogin Success!");
      bot.chat('/login '+ pass);
});
    
    
    bindEvents(bot);
  }
}

  
  