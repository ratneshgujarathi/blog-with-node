import moment from 'moment';
import {PAGE_NUMBER, ITEM_PER_PAGE} from '../constants/appConstants.js';

export function insertCommonFields(req){
    let date = new Date();
    return {
        'created_by': req.user || '',
        'created_at': date,
        'updated_at': date,
        'updated_by': req.user || ''
    };
}

export function updateCommonFields(req){
    let date = new Date();
    return {
        'updated_at': date,
        'updated_by': req.user || ''
    };
}

export function paginationFilterPost(data, pageSize=ITEM_PER_PAGE, pageNumber=PAGE_NUMBER){    
    let limit = 'limit' in data? Number(data.limit): pageSize;
    limit = limit < 0 ? pageSize : limit;
    let offset = 'page' in data? (Number(data.page)-1) * limit: (pageNumber-1) * limit;
    offset = offset < 0 ? pageNumber : offset;
    let page = 'page' in data? Number(data.page): pageNumber;
    return {limit, offset, page}
}

export function paginationFilterGet(req, pageSize=ITEM_PER_PAGE, pageNumber=PAGE_NUMBER){    
    let limit = 'limit' in req.query? int(req.query.limit): pageSize;
    limit = limit < 0 ? pageSize : limit;
    let offset = 'page' in req.query? (int(req.query.page)-1) * limit: (pageNumber-1) * limit;
    offset = offset < 0 ? pageNumber : offset;
    let page = 'page' in req.query? int(req.query.page): pageNumber;
    return {limit, offset, page}
}