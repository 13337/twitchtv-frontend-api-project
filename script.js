$(document).ready(function() {

  // This is is just some basic jQuery that takes care of all the logic for the menu that
  // allows the user to sort the listing of streamers based on their onlineitude.

  (function iife() {
    $("#menu").hide();
    $("#menu").css("cursor","pointer");
    $("#menubtn").css("cursor","pointer");
    $("#menubtn").click(function() {
      $("#menu").toggle();
    })
  })();

  (function iife() {
    $("#online").click(function() {
      $(".closed").hide();
      $(".offline").hide();
      $(".online").show()
    })
  })();
  (function iife() {
    $("#offline").click(function() {
      $(".online").hide();
      $(".closed").show();
      $(".offline").show();
    })
  })();
  (function iife() {
    $("#all").click(function() {
      $(".online").show();
      $(".closed").show();
      $(".offline").show();
    })
  })();

  (function main() {
    var streamers = {};

    streamers.arr = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "ESL_SC2", "OgamingSC2", "comster404"];

    streamers.arr.forEach(function(e, i) {
      $("#content").append("<p class='streamers' id=" + streamers.arr[i].toLowerCase() + "><a href='https://www.twitch.tv/" + streamers.arr[i].toLowerCase() + "' target='_new'>" + streamers.arr[i] + "</a></p>");
    })

    streamers.arr.forEach(function(e, i) {

      var streamer = streamers.arr[i].toString();
      var streamerStr = "#" + streamer.toLowerCase();

      $.getJSON('https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?').then(function(result) {
        
        
        if (result.stream != null) {
          $(streamerStr).addClass("online");
          $(streamerStr).html("<a href='"+result.stream.channel.url+"' target='_new'>" + streamer + "<div><p>"+result.stream.channel.status+"</p></div></a>");
        } else if (result.status === 422) {
          $(streamerStr).addClass("closed");
          $(streamerStr).html(streamer + "<span>Account Closed</span>");
        } else {
          $(streamerStr).addClass("offline");
          $(streamerStr).html("<a href='https://www.twitch.tv/"+ streamer + "' target='_new'>" + streamer + "<span>offline</span>");

        }

        
      
      })

    })

  })();

})