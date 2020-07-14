$(document).ready(function () {
  $("#light-dark-theme").change(function () {
    $(".content").toggleClass("dark");
    $("body").toggleClass("dark");
    $("nav").toggleClass("dark");
    $(".ext-weather").toggleClass("dark");
    $(".weather-head").toggleClass("dark");
    $(".day").toggleClass("dark");
  });

  // by default, icons are black but you can color them
  var skycons = new Skycons();

  // you can add a canvas by it's ID...
  skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

  // ...or by the canvas DOM element itself.
  skycons.add(document.getElementById("icon2"), Skycons.RAIN);
  skycons.add(document.getElementById("icon3"), Skycons.PARTLY_CLOUDY_NIGHT);
  skycons.add(document.getElementById("icon4"), Skycons.RAIN);
  skycons.add(document.getElementById("icon5"), Skycons.CLEAR_DAY);
  skycons.add(document.getElementById("icon6"), Skycons.CLEAR_NIGHT);

  skycons.play();
});
