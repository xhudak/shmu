export interface WeatherContext {
    stationName: string;
    temperature: {
        value: number|null; // null ak nema data
        unit: string|null;
    },
    wind: {
        direction: string|null;
        speed: number|null;
        gusts: number|null;
        unit: string|null;
    };
    pressure: {
        value: number|null;
        unit: string|null;
    };
    event: null|string;
    weatherDescription: null|string;
}