import config
import requests
from flask import Flask, request, render_template, redirect, url_for, jsonify
from datetime import datetime, timezone
from geopy.geocoders import Nominatim
import calendar
from icon_dictionary import code_to_class

app = Flask(__name__)
current_cities_weather = [] 

def get_current_weather(city_name):
  geolocator = Nominatim(user_agent="weather_app")
  location = geolocator.geocode(city_name)
  print(location)

  current_weather = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={location.latitude}&lon={location.longitude}&appid={config.APP_ID}&units=metric").json()
  # print(current_weather)
  return current_weather
  
@app.route("/")
def index():
  # print(len(current_cities_weather))
  return render_template('home.html', cities_weather=current_cities_weather)

@app.route("/addcity", methods=['POST'])
def add_city():
  data = request.get_json()
  city = data["city_name"]
  weather_info = get_current_weather(city)
  w_code = weather_info["weather"][0]["icon"]
  weather_info["weather"][0]["class_name"] = code_to_class[w_code]
  return {"city_weather": weather_info}

@app.route("/cities", methods=["POST"])
def get_cities():
  if request.method == "POST":
    current_cities_weather = []
    data = request.get_json()
    # print(data)
    for city in data["cities"]:
      weather_obj = get_current_weather(city)
      w_code = weather_obj["weather"][0]["icon"]
      weather_obj["weather"][0]["class_name"] = code_to_class[w_code]
      current_cities_weather.append(weather_obj)  
  return {"cities_weather": current_cities_weather}

@app.route("/city/<string:city_name>")
def search_city(city_name):
  city = "Moscow" #city_name
  w_res = requests.get(f'https://api.openweathermap.org/data/2.5/onecall?lat=45.6972&lon=-75.4215&exclude=hourly,minutely&appid={config.APP_ID}&units=metric').json()
  
  #add class to current weather
  w_code = w_res["current"]["weather"][0]["icon"]
  w_res["current"]["weather"][0]["class_name"] = code_to_class[w_code]

  #remove current and last two days (personal preference)
  del w_res["daily"][-2:]
  w_res["daily"].pop(0)
  #add class to forecast list
  for day in w_res["daily"]:
    day_num = datetime.fromtimestamp(int(day["dt"]), tz=timezone.utc)
    day_w_code = day["weather"][0]["icon"]
    day["weather"][0]["class_name"] = code_to_class[day_w_code]
    day["weekday"] = calendar.day_name[datetime.weekday(day_num)]


  return render_template("weather.html", current=w_res["current"], forecast=w_res["daily"])
  


if __name__ == "__main__":
  app.run(debug=True)