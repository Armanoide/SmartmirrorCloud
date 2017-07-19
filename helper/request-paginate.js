/**
 * Created by norbert on 11/01/2017.
 */


module.exports = function (req) {
    req.query._page = req.query._page || 1;
    req.query._perPage = req.query._perPage || 30 ;
    req.query._sortDir = req.query._sortDir || "ASC";
    req.query._sortField = req.query._sortField || "_id";

    if (0 == req.query._page) {
        req.query._page = 1;
    }

    if (0 == req._perPage || 500 < req.query._perPage ) {
        req.query._perPage = 500;
    }
    if('ASC' == req.query._sortDir){
        req.query._sortDir = 1
    }else if('DESC' == req.query._sortDir){
        req.query._sortDir = -1
    }

    req.query._page = parseInt(req.query._page);
    req.query._perPage = parseInt(req.query._perPage);
};