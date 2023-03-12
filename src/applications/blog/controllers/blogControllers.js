import asyncHandler from 'express-async-handler';
import {db} from '../../../services/database.js';
import { ErrorResponse, SuccessResponse } from "../../../helpers/response.js";
import { ObjectId } from 'mongodb';
import { paginationFilterPost, insertCommonFields, updateCommonFields } from '../../../helpers/common.js'

export const createBlog = asyncHandler(async (req, res) => {
    const data = req.body;
    try {
        if (!data.title || !data.body){
            throw new Error('INVALID_FIELD');
        }
        let commonFields = insertCommonFields(req);
        let insertQuery = {'title': data.title, "body": data.body, ...commonFields};
        const blogExists = await db.collection('Blogs').findOne({"title": data.title});
        if(blogExists){
            throw new Error('ALREADY_EXISTS')
        }
        await db.collection('Blogs').insertOne(insertQuery);
        const {status_code, response} = new SuccessResponse("success")
        res.status(status_code).send(response);
        
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});

export const getBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await db.collection('Blogs').find({'_id': new ObjectId(id)}).toArray();
        if(!blog){
            throw new Error('NOT_FOUND')
        }
        const {status_code, response} = new SuccessResponse({'blogs': blog });
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});

export const getBlogs = asyncHandler(async (req, res) => {
    try {
        let data = req.query;
        let query = [];
        let params = {'allowDiskUse': true}
        let matchObj = {}
        query.push({'$match': matchObj});
        let pagination = paginationFilterPost(data);
        query.push({'$skip': pagination.offset});
        query.push({'$limit': pagination.limit});
        const blogList = await db.collection('Blogs').aggregate(query, params).toArray();
        const {status_code, response} = new SuccessResponse({'blogs': blogList, 'page': pagination.page});
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});


export const updateBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        let updateQuery = {};
        if (data.title){
            updateQuery['title'] = data?.title;
        }
        if (data.body){
            updateQuery['body'] = data?.body;
        }
        
        await db.collection('Blogs').findOneAndUpdate({'_id': new ObjectId(id)}, 
        {'$set': {...updateQuery, ...updateCommonFields(req)}});
        const {status_code, response} = new SuccessResponse('success');
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});

export const deleteBlog = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        await db.collection('Blogs').deleteOne({'_id': new ObjectId(id)});
        const {status_code, response} = new SuccessResponse('success');
        res.status(status_code).send(response);
    } catch (err) {
        const {status_code, response}  = new ErrorResponse(err);
        res.status(status_code).send(response);
    }
});
