import axios from "axios";
const csvtojson = require('csvtojson');

export async function getCsvWeather(url: string) {
    let date = new Date();
    let currDateTime: string;
    currDateTime = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}:${date.getHours()}`;
    url += `;date=${currDateTime}`;
    //console.log(url);
    try {
      const { data, status } = await axios.get<any>(
        url,
        {
          headers: { },
        },
      );
        console.log(data);
        csvtojson({ delimiter: ';' })
            .fromString(data)
            .then((jsonObj: JSON) => {
                console.log(jsonObj);
            })
    } 
    catch (err) {
        console.log(err);
    }
}