/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var appOfertas = angular.module('appOfertas',['ionic']);
/**
 *
 */
appOfertas.controller('controllerOfertas', function($scope, ofertaService){
    $scope.ofertas = [];
    $scope.isLoading = true;
    $scope.status = "Carregando...";
    var data_atual = DateFormatter.toDBString(new Date());
    var ultima_consulta = window.localStorage.getItem('ultima_consulta');
    if(data_atual != ultima_consulta){
        var request = ofertaService.loadOfertas();
        
        request.success(function(data){
            data = data.substring(0, (data.indexOf(']') + 1) );
            $scope.ofertas = JSON.parse(data);
            window.localStorage.setItem('ofertas', data);
            window.localStorage.setItem('ultima_consulta', data_atual);
            $scope.isLoading = false;
            console.log('Carreguei do servidor');
        });

        request.error(function(data){
            $scope.status = "Impossível se comunicar com o servidor. Por favor, tente mais tarde.";
        });
    }else{
        $scope.ofertas = JSON.parse(window.localStorage.getItem('ofertas'));
        $scope.isLoading = false;
        console.log('Carreguei do storage');
    }
        
});

/**
 *
 */
appOfertas.service('ofertaService', function($http, $q){
    var loadOfertas = function(){
        return $http({
            method:'get', 
            url:'http://mtest.hostei.com/ofertas/getofertas.php'
        });
    };
    
    return {loadOfertas:loadOfertas};
});