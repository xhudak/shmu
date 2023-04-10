export interface IConfig
{
    weatherUrl: string;   
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