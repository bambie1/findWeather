import config
import requests
from flask import Flask, request, render_template, redirect, url_for, jsonify
from datetime import datetime, timezone
from geopy.geocoders import Nominatim
import calendar
from icon_dictionary import code_to_class

app = Flask(__name__)
current_cities_weather = [] 
geolocator = Nominatim(user_agent="weather_app")

def get_current_weather(city_name):
  location = geolocator.geocode(city_name)
  if location != None:
    current_weather = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={location.latitude}&lon={location.longitude}&appid={config.APP_ID}&units=metric").json()
  else:
    current_weather = {"error": "Couldn't find weather for this location"}
  return current_weather
  
def add_class_name(w_object):
  day_w_code = w_object["weather"][0]["icon"]
  w_object["weather"][0]["class_name"] = code_to_class[day_w_code]
  return w_object

@app.route("/")
def index():
  return render_template('home.html')

@app.route("/addcity", methods=['POST'])
def add_city():
  data = request.get_json()
  city = data["city_name"]
  try:
    weather_info = add_class_name(get_current_weather(city))
    city_array = city.split(',')
    weather_info["city_string"] = city_array[0]
  except:
    return {"error": "No data found"}, 500
  return {"city_weather": weather_info}

@app.route("/cities", methods=["POST"])
def get_cities():
  if request.method == "POST":
    current_cities_weather = []
    data = request.get_json()
    # print(data)
    for city in data["cities"]:
      current_obj = get_current_weather(""+city['city_string'] + ", " + city['sys']['country'])
      weather_obj = add_class_name(current_obj)
      weather_obj["city_string"] = city["city_string"]
      current_cities_weather.append(weather_obj)  
  return {"cities_weather": current_cities_weather}

@app.route("/city/<string:city_name>")
def search_city(city_name):
  location = geolocator.geocode(city_name)
  w_res = requests.get(f'https://api.openweathermap.org/data/2.5/onecall?lat={location.latitude}&lon={location.longitude}&exclude=hourly,minutely&appid={config.APP_ID}&units=metric').json()
  #add class to current weather
  w_code = w_res["current"]["weather"][0]["icon"]
  w_res["current"]["weather"][0]["class_name"] = code_to_class[w_code]
  w_res["current"]["city_country"] = city_name

  #remove current and last two days (personal preference)
  del w_res["daily"][-2:]
  w_res["daily"].pop(0)
  #edit forecast list
  for day in w_res["daily"]:
    day_num = datetime.fromtimestamp(int(day["dt"]), tz=timezone.utc)
    day = add_class_name(day)
    day["weekday"] = calendar.day_name[datetime.weekday(day_num)]
  return render_template("weather.html", current=w_res["current"], forecast=w_res["daily"])
  

if __name__ == "__main__":
  app.run(debug=True)