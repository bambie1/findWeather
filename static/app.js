$(document).ready(function () {
  //dark theme add class
  $("#light-dark-theme").change(function () {
    $(".content").toggleClass("dark");
    $("body").toggleClass("dark");
    $("nav").toggleClass("dark");
    $(".ext-weather").toggleClass("dark");
    $(".weather-head").toggleClass("dark");
    $(".day").toggleClass("dark");
    $(".weather-icon").toggleClass("dark");
    activateSkycons();
  });

  activateSkycons();
});

function activateSkycons() {
  // SKYCONS animation references
  var skycons = new Skycons();
  var darkskycons = new Skycons({ color: "white" });

  $(".rainy").each(function () {
    skycons.add(this, Skycons.RAIN);
  });
  $(".rainy.dark").each(function () {
    darkskycons.add(this, Skycons.RAIN);
  });
  $(".partly-cloudy-night").each(function () {
    skycons.add(this, Skycons.PARTLY_CLOUDY_NIGHT);
  });
  $(".partly-cloudy-night.dark").each(function () {
    darkskycons.add(this, Skycons.PARTLY_CLOUDY_NIGHT);
  });
  $(".clear-day").each(function () {
    skycons.add(this, Skycons.CLEAR_DAY);
  });
  $(".clear-day.dark").each(function () {
    darkskycons.add(this, Skycons.CLEAR_DAY);
  });
  $(".clear-night").each(function () {
    skycons.add(this, Skycons.CLEAR_NIGHT);
  });
  $(".clear-night.dark").each(function () {
    darkskycons.add(this, Skycons.CLEAR_NIGHT);
  });
  $(".partly-cloudy-day").each(function () {
    skycons.add(this, Skycons.PARTLY_CLOUDY_DAY);
  });
  $(".partly-cloudy-day .dark").each(function () {
    darkskycons.add(this, Skycons.PARTLY_CLOUDY_DAY);
  });
  $(".thunder").each(function () {
    skycons.add(this, Skycons.THUNDER);
  });
  $(".thunder.dark").each(function () {
    darkskycons.add(this, Skycons.THUNDER);
  });
  $(".fog").each(function () {
    skycons.add(this, Skycons.FOG);
  });
  $(".fog.dark").each(function () {
    darkskycons.add(this, Skycons.FOG);
  });
  $(".snow").each(function () {
    skycons.add(this, Skycons.SNOW);
  });
  $(".snow.dark").each(function () {
    darkskycons.add(this, Skycons.SNOW);
  });
  $(".cloudy").each(function () {
    skycons.add(this, Skycons.CLOUDY);
  });
  $(".cloudy.dark").each(function () {
    darkskycons.add(this, Skycons.CLOUDY);
  });
  $(".wind").each(function () {
    skycons.add(this, Skycons.WIND);
  });
  $(".wind.dark").each(function () {
    darkskycons.add(this, Skycons.WIND);
  });
  $(".showers-day").each(function () {
    skycons.add(this, Skycons.SHOWERS_DAY);
  });
  $(".showers-day.dark").each(function () {
    darkskycons.add(this, Skycons.SHOWERS_DAY);
  });
  $(".showers-night").each(function () {
    skycons.add(this, Skycons.SHOWERS_NIGHT);
  });
  $(".showers-night.dark").each(function () {
    darkskycons.add(this, Skycons.SHOWERS_NIGHT);
  });

  skycons.play();
  darkskycons.play();
}
