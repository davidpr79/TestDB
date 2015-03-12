"use strict";

var express = require('express');
var router = express.Router();
var dm = require('./../dm');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/api/vehicles', function(req, res, next) {
    dm.getVehicles( function(err,vehicles) {
        if( err ){
            next();
        }else{
            res.json(vehicles);
        }

    });
});

hola que tal como va convertTimezone()

module.exports = router;
