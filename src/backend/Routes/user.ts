import { Router, Request, Response }  from "express";
import User from "../Models/User";
import { IConfig } from "../Interfaces";
import { verifyToken } from "../tokenVerification";

export const router = Router();


router.get('/home', verifyToken, async (req: Request, res: Response) => {

    res.json({ "access": "allowed", "user": req.user });
});