import { Request, Response } from 'express';
import User from '../db/models/user';
import * as loginService from '../services/loginService';

export const ping = (req: Request, res: Response) => {
    let responseObj = {
        ping: "pong"
    }
    res.json(responseObj);
}

export const signUp = async (req: Request, res: Response) => {
    loginService.register(req, res);
}

export const login = async (req: Request, res: Response) => {

    loginService.credentialsCheck(req, res);
}

export const list = async (req: Request, res: Response) => {

    let user = await User.findAll({
        attributes: ['id', 'email', 'createdAt']
    });

    res.json(user);
}


