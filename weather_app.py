import config
import requests
from flask import Flask, request, render_template, redirect, url_for
from datetime import datetime, timezone
from geopy.geocoders import Nominatim
import calendar
from icon_dictionary import code_to_class

app = Flask(__name__)

@app.route("/")
def index():
  city="Ottawa"
  return render_template('home.html')

@app.route("/addcity", methods=['POST'])
def add_city():
  city = request.form["cityName"]
  geolocator = Nominatim(user_agent="weather_app")
  location = geolocator.geocode(city)
  print((location.latitude, location.longitude))
  return redirect(url_for('index'))


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