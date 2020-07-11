$(document).ready(function () {
  $("#light-dark-theme").change(function () {
    $(".content").toggleClass("dark");
    $("body").toggleClass("dark");
    $("nav").toggleClass("dark");
    $(".ext-weather").toggleClass("dark");
    $(".weather-head").toggleClass("dark");
    $(".day").toggleClass("dark");
  });
});
