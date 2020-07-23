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

  var cities = JSON.parse(localStorage.getItem("cities"));
  console.log("cities: ", cities);
  if (cities) {
    $.ajax({
      url: "/cities",
      method: "POST",
      data: JSON.stringify({ cities: cities }),
      contentType: "application/json; charset=utf-8",
      success: function (msg) {
        msg.cities_weather.forEach((element) => {
          addCityToList(element);
        });
        darkMode === "enabled" ? enableDarkMode() : null;
        activateSkycons();
      },
    });
  } else cities = [];
  $("#search-btn").click(searchWeather);

  function searchWeather() {
    $.ajax({
      url: "/addcity",
      method: "POST",
      data: JSON.stringify({ city_name: $("#address-input").val() }),
      contentType: "application/json; charset=utf-8",
      success: function (msg) {
        // console.log("Response: ", msg);
        $("#address-input").val("");
        addCity(msg.city_weather);
      },
    });
  }

  // <a href="/city/${element.city_string}" class="city-links">
  // <h3 class="city-name">${element.city_string}</h3>
  function addCity(element) {
    var cityExists = false;
    cities.forEach((city) => {
      if (
        city.city_string == element.city_string &&
        city.country_string == element.country_string
      ) {
        cityExists = true;
      }
    });
    if (!cityExists) {
      addCityToList(element);
      cities.unshift(element);
      localStorage.setItem("cities", JSON.stringify(cities));
    } else alert("This city has been added already");
  }

  function addCityToList(element) {
    var newItem = `<li class="city-block text-center p-2">
      <a href="/city/${element.city_string}" class="city-links">
      <h3 class="city-name">${element.city_string}</h3>
      <h4 class="city-block-temp">${Math.round(element.main.temp)} °C</h4>
      <canvas class="${
        element.weather[0].class_name
      } weather-icon" width="128" height="128"></canvas>
        <p class="current-desc">${element.weather[0].main}</p>
      </a>
    </li>`;
    $("#cities-list").prepend(newItem);
    darkMode = localStorage.getItem("darkMode");
    darkMode === "enabled" ? enableDarkMode() : null;
    activateSkycons();
  }

  function activateSkycons() {
    // SKYCONS animation references
    var skycons = new Skycons();
    var darkskycons = new Skycons({ color: "#cfcfcf" });

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
      skycons.add(this, Skycons.RAIN);
    });
    $(".thunder.dark").each(function () {
      darkskycons.add(this, Skycons.RAIN);
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
      skycons.add(this, Skycons.RAIN);
    });
    $(".showers-day.dark").each(function () {
      darkskycons.add(this, Skycons.RAIN);
    });
    $(".showers-night").each(function () {
      skycons.add(this, Skycons.RAIN);
    });
    $(".showers-night.dark").each(function () {
      darkskycons.add(this, Skycons.RAIN);
    });

    skycons.play();
    darkskycons.play();
  }
});
