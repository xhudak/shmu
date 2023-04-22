//const router = require('express').Router();
import { Router, Request, Response }  from "express";
import User from "../Models/User";
import { registerValidation, loginValidation } from "../validation";
import bcrypt from "bcrypt";
import { IConfig } from "../Interfaces";
import * as jwt from "jsonwebtoken";
import path from "path";
import { verifyToken } from "../tokenVerification";

let config: IConfig = require('../../../config.json');

export const router = Router();

router.get('/register', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post('/register', async (req: Request, res: Response) => {
    // Validation
    const { error, value } = registerValidation(req.body);
    let pwdMsg: string = "Heslo nespĺňa podmienky bezpečnosti."
    let message = (error?.details[0].message.includes("match"))? pwdMsg : error?.details[0].message;
    if (error) return res.status(400).send(message);

    // Check for duplicates
    const emailExists = await User.findOne({ email: req.body.email});
    const usernameExists = await User.findOne({ username: req.body.username});

    if (emailExists || usernameExists) {
        let returnMessage: string = "";
        returnMessage = (emailExists) ? "Email" : "Username";
        return res.status(409).send(`${returnMessage} already exists.`);
    }

    // Create a new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, config.database.saltRounds || 10),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
        console.log(`Dostal som ${error}.`);
    }
});

router.get('/login', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post('/login', async (req: Request, res: Response) => {
    // Validation
    const { error, value } = loginValidation(req.body);
    if (error) {
        let pwdMsg: string = "Zlé heslo";
        let message = (error.details[0].message.includes("match"))? pwdMsg : error.details[0].message;
        return res.status(400).send(message);
    }

    // Check if user exists
    const usernameExists = await User.findOne({ username: req.body.username});
    if (!usernameExists) return res.status(404); //.send("User not found.");

    // Check for password
    const validPassword: boolean = await bcrypt.compare(req.body.password, usernameExists.password);
    if (!validPassword) return res.status(403); //.send("Your password is incorrect.");

    // Create and provide the user a token

    var privateKey = config.server.key;
    var token = jwt.sign({ _id: usernameExists._id }, privateKey, { expiresIn: '1h' });
    jwt.sign({
        data: 'foobar'
      }, 'secret', { expiresIn: '1h' });
    res.header("Authorization", `Bearer ${token}`).send();
});

router.get("/logout", verifyToken, (req: Request, res: Response) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .redirect('/api/v1/auth/login');
  });

router.post('/', (req: Request, res: Response) => {
    res.send("haha");
});

// voytex - cRm1vo4McCoiYC8o
// mongodb+srv://<username>:<password>@wap.27syxzs.mongodb.net/?retryWrites=true&w=majority
// https://www.youtube.com/watch?v=2jqok-WgelI