import axios from "axios";
import cheerio from "cheerio";
import { WeatherContext } from "../Interfaces";

export async function getWeather(url: string) {
    try {
      const { data, status } = await axios.get<any>(
        url,
        {
          headers: { },
        },
      );
  
      //console.log(JSON.stringify(data, null, 4));
      //console.log(data);
      const $ = cheerio.load(data);
      const weatherTable = $('#tab-aktualne-pocasie tr');
      const tableCaption: string = $("caption").text();
      console.log(tableCaption);
      let actualWeatherTable: WeatherContext[] = [];
      weatherTable.each((i: number, elem: any) => {
        const stationName: string = $(elem).find("td:nth-child(1)").text();
        const temperature: number|null = parseFloat($(elem).find("td:nth-child(2)").text().replace("°C", '').trim()) || null;
        const windDirection: string|null = $(elem).find("td:nth-child(3)").text() || null;
        const windSpeed: number|null = parseFloat($(elem).find("td:nth-child(4)").text().split(" ")[0]) || null;
        const windUnit: string|null = $(elem).find("td:nth-child(4)").text().split(" ")[1] || null;
        const windGusts: number|null = parseInt($(elem).find("td:nth-child(5)").text().split(" ")[0]) || null;
        const pressureValue: number|null = parseFloat($(elem).find("td:nth-child(6)").text().split(" ")[0]) || null;
        const pressureUnit: string|null = $(elem).find("td:nth-child(6)").text().split(" ")[1] || null;
        const event: string|null = $(elem).find("td:nth-child(7)").text() || null;
        const weatherDescription: null|string = $(elem).find("td:nth-child(8)").text() || null;
/*
        console.log(
            */
        actualWeatherTable.push({
            stationName: stationName,
            temperature: {
                value: temperature,
                unit: "°C",
            },
            wind: {
                direction: windDirection,
                speed: windSpeed,
                gusts: windGusts,
                unit: windUnit,
            },
            pressure: {
                value: pressureValue,
                unit: pressureUnit,
            },
            event: event,
            weatherDescription: weatherDescription,
        });
        /*
        console.log(`${i}: ${$(elem).find("td").eq(1).text()}`);
        console.log(`${i}: ${$(elem).find("td").eq(2).text()}`);
        console.log(`${i}: ${$(elem).find("td").eq(3).text()}`);
        console.log(`${i}: ${$(elem).find("td").eq(4).text()}`);
        console.log(`${i}: ${$(elem).find("td").eq(5).text()}`);
        console.log(`${i}: ${$(elem).find("td").eq(6).text()}`);
        console.log(`${i}: ${$(elem).find("td").eq(7).text()}`);
        */
    });



      // 👇️ "response status is: 200"
      console.log('response status is: ', status);
        console.log(actualWeatherTable)
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
}