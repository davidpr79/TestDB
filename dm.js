"use strict";

var db = require("mysql");

var getVehicles;
getVehicles = function (cb) {

    var dbcon = db.createConnection({ host: 'localhost', user: 'admin', password: 'mamen23*', database: 'masterpk_ttp' });
    dbcon.connect( function(err) {
        if (!err) {
            console.log('connected as id ' + dbcon.threadId);
            /* 'select * from remolcs where empresa='+connection.escape(userId);*/
            dbcon.query('SELECT Id,MatriculaR,R.Estat,E.Descripcio,DataEntradaPrevista,DataEntrada,DataSortida,Motiu FROM `remolcs` R ' +
                'left join remestats E on (R.Estat=E.Estat) where R.Estat<=3 order by dataentradaprevista desc limit 100',
                function (error, results, fields) {
                    console.log('error: ' + error);
                    dbcon.end();
                    return cb(error, results);
                });
        } else {
            console.error('error connecting: ' + err.stack);
            return cb(err);
        }

    });
};

exports.getVehicles = getVehicles;




