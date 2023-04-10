import { Router, Request, Response }  from "express";
import path from "path";

export const router = Router();


router.get('/:dirname/:filename', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, `../static/${req.params.dirname}/${req.params.filename}`));
});