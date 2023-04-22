import axios from "axios";

export async function getCsvWeather(url: string) {
    try {
      const { data, status } = await axios.get<any>(
        url,
        {
          headers: { },
        },
      );
        console.log(data);
    } 
    catch (err) {
        console.log(err);
    }
}