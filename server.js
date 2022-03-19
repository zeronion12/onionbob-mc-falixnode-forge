// Now make both Main chat function and events chat function the same
// Now test with maximum 30 min idle for heroku to reduce usage
var mineflayer = require('mineflayer');
var pass = "12345"; // "Authme" plugin password (No plugin No delete)

// Configurations, Could all be "process.env.XXX" and set in Heroku
var ayar = {
  host: "ult12.falix.gg", // Server IP
  port: process.env.port || 39132, // Need change to target port
  username: "ONIONBOT2", // Bot Name in Minecraft
  version: "1.18.1" // Need change to target version
};

// ---Main Program--- //
var bot = mineflayer.createBot(ayar);
bindEvents(bot);
// ------------------ //

// Events to bind
function bindEvents(bot) {
  
  // Continuous function to pretend Bot running (30 min interval to set control state)
  bot.on('chat', function(username, message) {
    if (username === bot.username) return;
    function intervalFunc() {
      bot.setControlState('forward', true)
    }
    setInterval(intervalFunc,1800000);
    console.log('Interval Message!');
    bot.chat('/login '+ pass);
  });

  // Error function
  bot.on('error', function(err) {
    console.log("Error!");
  });
  
  // Exception function: if End => Relogin (only 10 min out)
  bot.on('end', function() {
    console.log("End!");
    setTimeout(relog, 600000);
  });
  
  // Relogin function: do the same like Main Program
  function relog() {
    console.log("Relogin!");
    bot = mineflayer.createBot(ayar);
    bindEvents(bot);
  }
}

  
  