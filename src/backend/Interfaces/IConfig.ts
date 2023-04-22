export interface IConfig
{
    weatherUrl: string;   
    weatherApi: string;
    server: {
        address: string;
        port: number;
        key: string;
    }
    database: {
        username: string;
        password: string;
        saltRounds: number;
    }
}