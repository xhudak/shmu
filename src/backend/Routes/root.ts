import { Router, Request, Response }  from "express";
import path from "path";

export const router = Router();


router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../views/homepage.html"));
});