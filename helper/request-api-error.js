/**
 * Created by norbert on 11/01/2017.
 */


module.exports.error500 = function (res) {
    res.status(500);
    res.json({error: 500, description:'unexpected error'});
};

module.exports.error404 = function (res, message) {
    message = message || '';
    res.status(404);
    res.json({error: 404, description:'not found' + ' ' + message});
};

module.exports.error400 = function (res, message) {
    message = message || '';
    res.status(400);
    res.json({error: 400, description:' bad request' + ' ' + message});
};
