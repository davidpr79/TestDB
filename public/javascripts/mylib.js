/*jslint node: true */
/*global angular */
"use strict";

var appModule = angular.module("myApp",['ui.router']);

appModule.controller("logisticsController", function($scope,$http) {

    $scope.companyID = 0;
    $scope.plate = "";
    $scope.currentVisit = 0;
    $scope.visits = "";
    $scope.rowclasses = ["warning","success","active","info"];
    $scope.autText = ["PENDIENTE","CONFIRMADA","DENEGADA"];

    $scope.getRowClass = function(x){
        if(x.authStatus==0) return "danger";
        else if(x.state=="Entrada Prevista") return "warning";
        else if(x.state=="Dentro") return "success";
        else if(x.state=="Fuera") return "info";
    };

    $scope.getVisits = function() {

        if($scope.companyId>=1) {
            $http.get("api/trailerTrack/findByCompany", {params: {companyId: $scope.companyId}}).
                success(function (data, status) {
                    $scope.visits = data;
                    if (data.length == 0) alert("No se ha encontrado ningún movimiento");
                }).error(function (data, status) {
                    document.write(data);
                });
        }else if( $scope.plate!="") {
            $http.get("api/trailerTrack/findByPlate", {params: {plate: $scope.plate}}).
                success(function (data, status) {
                    $scope.visits = data;
                    if (data.length == 0) alert("No se ha encontrado ningún movimiento");
                }).error(function (data, status) {
                    document.write(data);
                });
        }
    }

    $scope.modifyVisit = function(){

        var datavisita = { clientComments:"Hola que ase", authStatus:"1" };
        $http.put("api/trailerTrack/updateInfo",datavisita, {params: {trackId:$scope.currentVisit}} )
            .success(function (data, status)
            {
            //    $scope.putCallResult = logResult("PUT SUCCESS", data, status, headers, config);
            })
            .error(function (data, status, headers, config)
            {
                document.write(data);
            });
    }

});

appModule.controller("mainController", function($scope,$http,$state){

});

appModule.controller("homeController", function($scope,$http){

});

appModule.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state("home", {
                        url: "/",
                        templateUrl: 'home.html',
                        controller: 'homeController'
                    });

    $stateProvider.state("vehicles", {
                        url: "/",
                        templateUrl: 'vehicles.html',
                        controller: 'logisticsController'
                    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
});
