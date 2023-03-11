import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../db/models/user';

export const credentialsCheck = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let userEmail: string = req.body.email;

        let user = await User.findOne({
            where: {
                email: userEmail,
            }
        });
        if (user) {
            let hashCheck = await bcrypt.compare(req.body.password, user.password);
            console.log(hashCheck);
            if (hashCheck) {
                const token = JWT.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET_KEY as string,
                    {
                        expiresIn: '2h'
                    }
                );
                res.json({
                    error: false,
                    token: token
                })
            }
            else {
                res.status(401).json({
                    error: true,
                    msg: 'invalid credentials'
                })
            }
        }
        else {
            console.log('entrei aqui');
            res.status(401).json({
                error: 'invalid user'
            });
        }
    }
}

export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let credentials = {
            email: req.body.email,
            password: req.body.password
        };

        let hasUser = await User.findOne({
            where: {
                email: credentials.email
            }
        });

        if (!hasUser) {
            const salt = await bcrypt.genSalt(10);
            credentials.password = await bcrypt.hash(credentials.password, salt);

            let newUser = await User.create({
                email: credentials.email,
                password: credentials.password,
            });

            res.status(201).json({
                id: newUser.id,
            });
        }
        else {
            res.json({
                error: "Email already taken"
            });
        }
    }
    else{
        res.status(400).json({
            error: 'Invalid data'
        });
    }

}