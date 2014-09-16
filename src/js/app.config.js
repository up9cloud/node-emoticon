'use strict';

// Declare app level module which depends on filters, and services
angular.module('node-emoticon', [
    'ngRoute',
    'app.controllers'
])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
                $routeProvider.when('/', {templateUrl: 'html/api.html', controller: 'AdminCtrl'});
                $routeProvider.otherwise({redirectTo: '/'});
//                $locationProvider.html5Mode(true);
            }])
angular.module('app.directives', []);
angular.module('app.controllers', []);
angular.module('app.filters', []);
angular.module('app.services', []);
    