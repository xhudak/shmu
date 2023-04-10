import { WeatherContext, IConfig } from "./Interfaces";
import { getWeather } from "./Modules";

let config: IConfig = require('./config.json');


  
getWeather(config.weatherUrl);