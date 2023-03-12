import asyncHandler from 'express-async-handler';
import {db} from '../../../services/database.js';
import { ErrorResponse, SuccessResponse } from "../../../helpers/response.js";
import { ObjectId } from 'mongodb';
import { paginationFilterPost, insertCommonFields, updateCommonFields } from '../../../helpers/common.js'


export const createBlog = asyncHandler(async (req, res) => {
    const data = req.body;
    try {
        if (!data.title || !data.body){
            throw new Error('InvalidFieldError');
        }
        let commonFields = insertCommonFields(req);
        let insertQuery = {'title': data.title, "body": data.body, ...commonFields};
        const blogExists = await db.collection('Blogs').findOne({"title": data.title});
        if(blogExists){
            throw new Error('AlreadyExistsError')
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
        const blog = await db.collection('Blogs').findOne({'_id': new ObjectId(id)});
        if(!blog){
            throw new Error('NotFoundError')
        }
        const {status_code, response} = new SuccessResponse(blog);
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
        let matchObj = {}
        let result = {}
        let params = {'allowDiskUse': true}
        query.push({'$match': matchObj});
        if ('show_count' in data){
            let countQuery = [...query, {'$count': 'count'}];
            result['total_count'] = await (await db.collection('Blogs').aggregate(countQuery, params).toArray()).pop()['count'];
        }
        let pagination = paginationFilterPost(data);
        query.push({'$skip': pagination.offset});
        query.push({'$limit': pagination.limit});
        result['blogs'] = await (await db.collection('Blogs').aggregate(query, params).toArray());
        result['page'] = pagination.page
        const {status_code, response} = new SuccessResponse(result);
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
