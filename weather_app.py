import config
import requests
from flask import Flask,  render_template

app = Flask(__name__)

@app.route("/")
def index():
  return render_template('home.html')
  
@app.route("/weather")
def weather():
  return render_template('weather.html')

@app.route("/city/<string:city_name>")
def search_city(city_name):
  API_KEY = 'your api key'  # initialize your key here
  city = "Moscow" #city_name
  
  url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&APPID={config.APP_ID}&units=metric'
  response = requests.get(url).json()
  
  return render_template("weather.html", info=response)
  
if __name__ == "__main__":
  app.run(debug=True)