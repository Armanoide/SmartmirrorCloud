/**
 * Created by on 06/01/2017.
 */


var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var requestPagerInit = require('../../helper/request-paginate');
var requestAPIError = require('../../helper/request-api-error');
var request = require('request');

var getMe = function(req, res) {

    requestPagerInit(req);

    User.find({}).then(function (result) {

        if (result.length > 0) {
            res.json(result[0].expose());
        } else {
            requestAPIError.error500(res);
        }
    }).catch(function (err) {
        console.log(err);
    });

};

var updateMe = function(req, res) {

    requestPagerInit(req);

    User.find({}).then(function (result) {

        console.log(req);
        if (result.length > 0) {
            var user = result[0];

            if(req.body.first_name) {
                user.firstName = req.body.first_name;
            }

            if(req.body.last_name) {
                user.lastName = req.body.last_name;
            }
            if(req.body.latitude) {
                user.latitude = req.body.latitude;
            }

            if(req.body.longitude) {
                user.longitude = req.body.longitude;
            }

            user.updateAt = new Date();
            user.save().then(function () {
                res.json(user.expose());
            }).catch(function () {
                requestAPIError.error400(res);
            });

            res.json(result[0].expose());
        } else {
            requestAPIError.error500(res);
        }

    }).catch(function (err) {
        console.log(err);
    });

};

var getMeWeather = function (req, res) {

    User.find({}).then(function (result) {


        if (result.length > 0) {

            var user = result[0];


            request('https://api.weather.com/v2/turbo/vt1observation?apiKey=d522aa97197fd864d36b418f39ebb323&geocode='+ user.latitude +'%2C'+ user.longitude +'&units=m&language=fr-FR&format=json',
                function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json = JSON.parse(body);
                    res.json({

                        'phrase' : json.phrase ? json.phrase : "-",
                        'temperature': json.temperature ? json.temperature : "-"
                    });
                } else {
                    requestAPIError.error500(res);
                    console.log(err)
                }
            });


        } else {
            requestAPIError.error500(res);
        }
    }).catch(function (err) {
        console.log(err);
    });

};


router.get('/me/weather', getMeWeather);
router.get('/me', getMe);
router.post('/me', updateMe);

module.exports = router;

