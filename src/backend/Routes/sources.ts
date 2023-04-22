import { Router, Request, Response }  from "express";
import { IConfig } from "../Interfaces";
import path from "path";
import { getCsvWeather } from "../Modules/getCsvWeather";

let config: IConfig = require('../../../config.json');

export const router = Router();

router.get('/cities', async (req: Request, res: Response) => {
    res.json(await getCsvWeather(config.weatherApi));
}); 

router.get('/:dirname/:filename', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, `../static/${req.params.dirname}/${req.params.filename}`));
});