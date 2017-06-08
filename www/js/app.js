// Ionic Starter App
angular.module('starter', ['ionic', 'starter.controllers'])

        .run(function ($ionicPlatform, $ionicHistory) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            $ionicConfigProvider.tabs.position('bottom');
            $stateProvider
                    .state('app', {
                            url: '/app',
                            abstract: true,
                            templateUrl: './templates/menu.html',
                            controller: 'AppCtrl',
                        }
                    })
              
                    .state('app.paypal', {
                        url: '/paypal',
                        views: {
                            'menuContent': {
                                templateUrl: './templates/paypal.html',
                                controller: 'PaypalCtrl'
                            }
                        }
           
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('app/businessgiving');

            })
            .config(function ($httpProvider) {
                $httpProvider.interceptors.push('httpRequestInterceptor');
            })
  
