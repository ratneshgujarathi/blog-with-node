import jwt from 'jsonwebtoken';
import conf from '../../../config/config.js';
import bcrypt from 'bcryptjs';

export function generateToken(payload) {
    return jwt.sign(payload, conf.SECRET_KEY, {'expiresIn': '1h', 'algorithm': 'HS256'})
};

export function verifyToken(req){
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, conf.SECRET_KEY, (err, decoded) => {
            if(err){
                throw Error(err);
            }
            req.decoded = decoded;

        })
    }
}

export function generateHash(plainPassword) {
    return bcrypt.hashSync(plainPassword, 11);
}  

export function verifyHash(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}
