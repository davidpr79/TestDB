"use strict";
var express = require('express');
var router = express.Router();
var dm = require('./dm');

// Get home page
router.get('/', function(req, res, next) {
    res.render('index');
});

// TrailerTrack API functions

router.get('/api/trailerTrack/findByCompany', function (req,res,next){

    console.log("GET findByCompany: companyId="+req.query.companyId);
    if( (req.query.companyId!=null)&&(req.query.companyId!="") ) {
        dm.getOperatorLogistics(req.query.companyId, function (err, visits) {
            if (!err) res.json(visits);
            else      next(err);
        });
    }else{
        res.json("");
    }
});

router.get('/api/trailerTrack/findByPlate', function (req,res,next){

    console.log("GET findByPlate: plate="+req.query.plate);
    if( (req.query.plate!=null)&&(req.query.plate!="") ) {
        dm.getPlateLastAccess(req.query.plate, function (err, visits) {
            if (!err) res.json(visits);
            else      next(err);
        });
    }else{
        res.json("");
    }
});

router.put('/api/trailerTrack/updateInfo', function(req, res,next) {

    console.log('updateInfo: trackId='+req.query.trackId+" comment="+req.body.clientComments+" aut="+req.body.authStatus);
    if( (req.query.trackId>0)&&(req.body.clientComments!=null)&&(req.body.authStatus>=0)&&(req.body.authStatus<=2) ) {
        dm.updateVisit( req.query.trackId, req.body.clientComments, req.body.authStatus, function (err) {
            if (!err) res.json("OK");
            else      next(err);
        });
    }else {
        res.json("");
    }
});

module.exports=router;

