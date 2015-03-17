"use strict";

var db = require("mysql");
var connectionParams = { host: 'localhost', user: 'admin', password: 'mamen23*', database: 'masterpk_ttp' };

var getOperatorLogistics = function (companyID,cb) {

    var dbcon = db.createConnection(connectionParams);
    var ddesde = new Date();
    ddesde.setDate(ddesde.getDate()-7);

    dbcon.connect( function(err) {
        if (!err) {
            console.log('MySQL connected as id ' + dbcon.threadId);
            /* 'select * from remolcs where empresa='+connection.escape(operatorId); NO FUNCIONA (JA HO MIRAREM...)*/
            dbcon.query('SELECT id,MatriculaR as plate,E.Descripcio as state,R.Empresa as companyId,DataEntradaPrevista as expectedDate,' +
                'DataEntrada as entranceDate,DataSortida as exitDate,Motiu as zone,ComentariClient as clientComments,Autoritzacio as authStatus FROM `remolcs` R ' +
                'left join remestats E on (R.Estat=E.Estat) where R.Empresa=? and R.Estat<=3 and R.DataEntradaPrevista>=? '+
                'order by Id',[companyID,ddesde.toISOString().slice(0, 10)],
                function (error, results, fields) {
                    if(error) console.log('MySQL error: ' + error);
                    dbcon.end();
                    return cb(error, results);
                });
        } else {
            console.error('MySQL error connecting: ' + err.stack);
            return cb(err);
        }

    });
};

var getPlateLastAccess = function (plate,cb) {

    var dbcon = db.createConnection(connectionParams);
    var ddesde = new Date();
    ddesde.setDate(ddesde.getDate()-30);

    dbcon.connect( function(err) {
        if (!err) {
            console.log('MySQL connected as id ' + dbcon.threadId);
            /* 'select * from remolcs where empresa='+connection.escape(operatorId); NO FUNCIONA (JA HO MIRAREM...)*/
            dbcon.query('SELECT id,MatriculaR as plate,E.Descripcio as state,R.Empresa as companyId,DataEntradaPrevista as expectedDate,' +
                'DataEntrada as entranceDate,DataSortida as exitDate,Motiu as zone,ComentariClient as clientComments,Autoritzacio as authStatus FROM `remolcs` R ' +
                'left join remestats E on (R.Estat=E.Estat) where R.MatriculaR=? and R.Estat<=3 and R.DataEntradaPrevista>=? '+
                'order by DataEntradaPrevista desc, DataEntrada desc limit 1',[plate,ddesde.toISOString().slice(0, 10)],
                function (error, results, fields){
                    if(error) console.log('MySQL query error: ' + error);
                    dbcon.end();
                    return cb(error, results);
                });
        } else {
            console.error('MySQL error connecting: ' + err.stack);
            return cb(err);
        }

    });
};

var updateVisit = function (visitID,comment,aut,cb) {

    var dbcon = db.createConnection(connectionParams);
    var ddesde = new Date();
    ddesde.setDate(ddesde.getDate()-30);

    dbcon.connect( function(err) {
        if (!err) {
            console.log('MySQL connected as id ' + dbcon.threadId);
            /* 'select * from remolcs where empresa='+connection.escape(operatorId); NO FUNCIONA (JA HO MIRAREM...)*/
            dbcon.query('UPDATE remolcs SET ComentariClient=?, Autoritzacio=? WHERE Id=?',[comment,aut,visitID],
                function (error, results, fields){
                    if(error) console.log('MySQL query error: ' + error);
                    dbcon.end();
                    return cb(error);
                });
        } else {
            console.error('MySQL error connecting: ' + err.stack);
            return cb(err);
        }

    });
};

exports.getOperatorLogistics = getOperatorLogistics;
exports.getPlateLastAccess = getPlateLastAccess;
exports.updateVisit = updateVisit;




