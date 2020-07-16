$(document).ready(function () {
  //dark theme add class
  $("#light-dark-theme").change(function () {
    $(".content").toggleClass("dark");
    $("body").toggleClass("dark");
    $("nav").toggleClass("dark");
    $(".ext-weather").toggleClass("dark");
    $(".weather-head").toggleClass("dark");
    $(".day").toggleClass("dark");
  });

  // SKYCONS animation references
  var skycons = new Skycons();
  $(".rainy").each(function () {
    skycons.add(this, Skycons.RAIN);
  });
  $(".partly-cloudy").each(function () {
    skycons.add(this, Skycons.PARTLY_CLOUDY_NIGHT);
  });
  $(".clear-day").each(function () {
    skycons.add(this, Skycons.CLEAR_DAY);
  });
  $(".clear-night").each(function () {
    skycons.add(this, Skycons.CLEAR_NIGHT);
  });
  $(".partly-cloudy-day").each(function () {
    skycons.add(this, Skycons.PARTLY_CLOUDY_DAY);
  });
  $(".thunder").each(function () {
    skycons.add(this, Skycons.THUNDER);
  });
  $(".fog").each(function () {
    skycons.add(this, Skycons.FOG);
  });
  $(".snow").each(function () {
    skycons.add(this, Skycons.SNOW);
  });
  $(".cloudy").each(function () {
    skycons.add(this, Skycons.CLOUDY);
  });
  $(".wind").each(function () {
    skycons.add(this, Skycons.WIND);
  });
  $(".showers-day").each(function () {
    skycons.add(this, Skycons.SHOWERS_DAY);
  });
  $(".showers-night").each(function () {
    skycons.add(this, Skycons.SHOWERS_NIGHT);
  });

  skycons.play();
});
