/*jslint node: true */
/*global angular */
"use strict";

var appModule = angular.module("myApp",['ui.router']);

              // prevista, dentro, --------, fuera
var rowclasses = ["warning","success","active","info"];

appModule.controller("vehiclesController", function($scope,$http){
    $http.get("api/vehicles").success( function(data) {
            $scope.vehicles = data;
            var i;
            for(i=0;i<data.length;i++){
                $scope.vehicles[i].RowClass=rowclasses[$scope.vehicles[i].Estat];
                $scope.vehicles[i].Autorizacion='CONFIRMADO';
            }
            $scope.vehicles[2].Autorizacion='PENDIENTE';
            $scope.vehicles[6].Autorizacion='PENDIENTE';
            $scope.vehicles[9].Autorizacion='CANCELADO';
    });
});

appModule.controller("mainController", function($scope,$http,$state){
    $scope.GotoVehicles = function(){
            $state.go("vehicles");
    };
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
                        controller: 'vehiclesController'
                    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
});
