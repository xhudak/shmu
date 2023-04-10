import * as jwt from "jsonwebtoken";
import { Express, Request, Response, NextFunction }  from "express";
import { IConfig } from "./Interfaces";
let config: IConfig = require('../../config.json');


export function verifyToken (req: Request, res: Response, next: NextFunction) {
    const token: string|undefined = req.cookies?.access_token?.replace("Bearer ", '') || undefined; //req.header("Authorization")?.replace("Bearer ", '') || req.cookies.access_token?.replace("Bearer ", '');
    if (!token) return res.status(401).redirect('/api/v1/auth/login'); //sendFile(path.join(__dirname, "./views/login.html")); //.send("Access Denied!");

    try {
        const verified = jwt.verify(token, config.server.key);
        // req._id = verified;
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).redirect('/api/v1/auth/login'); //sendFile(path.join(__dirname, "./views/login.html")); //send("Unauthorized!");
    }
};