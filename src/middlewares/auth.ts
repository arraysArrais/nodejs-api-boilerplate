import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        if (req.headers.authorization) {
            const authData = req.headers.authorization.split(' ');
            if (authData[0] === 'Bearer') {

                try {
                    JWT.verify(authData[1], process.env.JWT_SECRET_KEY as string);
                    success = true;
                }
                catch (error) {
                    console.log("AUTH ERROR: " + error);
                }
            }
        }

        if (success) {
            next();
        }
        else {
            res.status(403);
            res.json({
                error: 'Não autorizado'
            });
        }
    }
}