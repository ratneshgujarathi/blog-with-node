import * as jwt from 'jsonwebtoken';
import conf from '../config/config.js';
import { ErrorResponse } from '../helpers/response.js';

export function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token) {
            throw new Error('UnauthorizedError');
        }
        jwt.verify(token, conf.SECRET_KEY, (err, decoded) => {
            if (err) {
                throw Error(err);
            }
            req.user = {
                id: decoded.id,
                email: decoded.email,
            };
            next();
        });

    } catch (err) {
        const { status_code, response } = new ErrorResponse(err);
        return res.status(status_code).send(response);
    }
}