var la;
var lo;
var ftemp;
var ctemp;
var condid;
//variables to store date and current time
var currentTime = new Date();
var h = currentTime.getHours();
//function to store latitude and longitude variables
function success(pos) {
  la = Math.round(pos.coords.latitude);
  lo = Math.round(pos.coords.longitude);
};
//function to handle error in obtaining geolocation
function error(err) {
  document.getElementByID("lat").innerHTML = "Error";
};
//get users' location
navigator.geolocation.getCurrentPosition(success, error);
//on click send request to open weather api returns current weather description
$(document).ready(function() {
  $("#evbut").on("click", function() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + la + "&lon=" + lo + "&units=imperial&appid=3598fc3bbe94f340aa0830b034e1b365", function(jd) {
      $("#cond").html("<p>" + jd.weather[0].description + "</p>");           $("#fandc").html(Math.round(jd.main.temp) + "<sup>o</sup><b>F</b>");
      //set temperature in farenheit
      ftemp = Math.round(jd.main.temp);
      //store temperature in celsius
      ctemp = Math.round((ftemp - 32) / 1.8);
      //function to togle between farenheit and celsius when clicked
      $i = 0;
      $("#fandc").on("click", function() {
        if ($i === 0) {
          $("#fandc").html(ctemp + "<sup>o</sup><b>C</b>");
          $i = 1;
        } else {
          $("#fandc").html(ftemp + "<sup>o</sup><b>F</b>");
          $i = 0;
        };
      });
      condid = jd.weather[0].id;
      if((condid === 800)&&((h >6)&&(h<20))){
        $("#wicon").html("<i class='wi wi-day-sunny'></i>");
      } else if ((condid === 800)&&((h <6)||(h>20))){
        $("#wicon").html("<i class='wi wi-night-clear'></i>");
      } else if ((condid>=200) &&(condid<235)){
        $("#wicon").html("<i class='wi wi-thunderstorm'></i>");
      } else if ((condid>=300)&&(condid<535)){
        $("#wicon").html("<i class='wi wi-rain'></i>");
      } else if((condid>=600)&&(condid<635)){
        $("#wicon").html("<i class='wi wi-snow'></i>");
      } else if ((condid>=801)&&(condid<805)){
        $("#wicon").html("<i class='wi wi-cloud'></i>");
      } else {
        $("#wicon").html("<i class='wi wi-thermometer'></i>");
      };
  
    
    });
   
       
      
  });
});