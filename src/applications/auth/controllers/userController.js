import asyncHandler from 'express-async-handler';
import {db} from '../../../services/database.js';
import { ErrorResponse, SuccessResponse } from "../../../helpers/response.js";
import * as authUtils from '../utils/auth.js';
import { ObjectId } from 'mongodb';

export const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password){
            throw new Error('REQUIRED_FIELD')
        }
        if (password.length < 8){
            throw new Error('INCORRECT_PASSWORD_LENGTH')
        }
        const userExists = await db.collection('Users').findOne({email});
        // console.log(userExists);
        if(userExists){
            throw new Error('ALREADY_EXISTS')
        }
        const hashedPassword = authUtils.generateHash(password);
        const result = await db.collection('Users').insertOne({'full_name': fullName, "email": email, 'password': hashedPassword});
        const token = authUtils.generateToken({'id': result.insertedId, 'email': email, 'fullName': fullName});
        const {status_code, response} = new SuccessResponse({"result": {'token': token }})
        res.status(status_code).send(response);
        
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password){
            throw new Error('REQUIRED_FIELD')
        }
        if (password.length < 8){
            throw new Error('INCORRECT_PASSWORD_LENGTH')
        }
        const userExists = await db.collection('Users').findOne({email});
        console.log(userExists);
        if(!userExists){
            throw new Error('USER_NOT_FOUND')
        }
        const verifiedUser = authUtils.verifyHash(password, userExists.password);
        if (!verifiedUser){
            throw new Error('INCORRECT_PASSWORD');
        }
        const token = authUtils.generateToken({'id': userExists._id, 'email': userExists.email, 'fullName': userExists.fullName});
        const {status_code, response} = new SuccessResponse({"result": {'token': token }})
        res.status(status_code).send(response);
        
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});

export const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const user = await db.collection('Users').find({'_id': new ObjectId(id)}).project({'password': 0}).toArray();
        if(!user){
            throw new Error('NOT_FOUND')
        }
        const {status_code, response} = new SuccessResponse({'users': user });
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});

export const getUsers = asyncHandler(async (req, res) => {
    try {
        const userList = await db.collection('Users').find({})
        .project({'password': 0})
        .sort({'full_name': 1})
        .allowDiskUse(true).toArray();
        const {status_code, response} = new SuccessResponse({'users': userList });
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});


export const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { full_name, email} = req.body;
    try {
        let updateQuery = {};
        if (full_name){
            updateQuery['full_name'] = full_name;
        }
        if (email){
            updateQuery['email'] = email;
        }
        await db.collection('Users').findOneAndUpdate({'_id': new ObjectId(id)}, 
        {'$set': updateQuery});
        const {status_code, response} = new SuccessResponse('success');
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        await db.collection('Users').deleteOne({'_id': new ObjectId(id)});
        const {status_code, response} = new SuccessResponse('success');
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});
