import axios from "axios";
const csvtojson = require('csvtojson');

export async function getCsvWeather(url: string) {
    const date = new Date();
    let currDateTime: string;
    currDateTime = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}:${date.getHours()}`;
    url += `;date=${currDateTime}`;
    let cities: any;

    try {
        const { data, status } = await axios.get<any>(
            url,
            {
                headers: { },
            },
        );
        cities = await csvtojson({ delimiter: ';' })
            .fromString(data)
        cities = cities.map((e: any) => e.name);
        return cities;
    } 
    catch (err) {
        console.log(err);
        return null;
    }
}