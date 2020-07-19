$(document).ready(function () {
  //local storage to save dark mode preferences
  var darkMode = localStorage.getItem("darkMode");
  darkMode === "enabled" ? enableDarkMode() : null;

  function enableDarkMode() {
    localStorage.setItem("darkMode", "enabled");
    $("body *").addClass("dark");
    $("body").addClass("dark");
    $("#light-dark-theme input").prop("checked", true);
  }
  function disableDarkMode() {
    localStorage.setItem("darkMode", null);
    $("body *").removeClass("dark");
    $("body").removeClass("dark");
  }
  //dark theme toggle
  $("#light-dark-theme").change(function () {
    darkMode = localStorage.getItem("darkMode");
    darkMode === "enabled" ? disableDarkMode() : enableDarkMode();
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
  $(".partly-cloudy-day.dark").each(function () {
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
