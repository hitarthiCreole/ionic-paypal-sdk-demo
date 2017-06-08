//previously we use angular.module('starter.controllers', ['ngCookies']) except for b1g1 and also change in controoler.js and index.html
angular.module('b1g1.controllers')
    
    //constants for paypal
        .constant('shopSettings',{

            payPalSandboxId :'ATNKZfuLJFZ2pjYuWpCUVXhN3vNCYRhtD5G9IBnTLBu7cdZjFYf48_6eVjTGEwrd9fQuEKe5x5dWfEWi',

            payPalProductionId : 'production id here',

            payPalEnv: 'PayPalEnvironmentSandbox', // for testing production for production

            payPalShopName : 'MyShopName',

            payPalMerchantPrivacyPolicyURL : 'url to policy',

            payPalMerchantUserAgreementURL : ' url to user agreement '

            }) 
        
    // paypal code
            .factory('PaypalService', ['$q', '$ionicPlatform', 'shopSettings', '$filter', '$timeout', function ($q, $ionicPlatform, shopSettings, $filter, $timeout) {
    	        var init_defer;
        	
            	var service = {
            	initPaymentUI:      initPaymentUI,
            	createPayment:      createPayment,
            	configuration:      configuration,
            	onPayPalMobileInit: onPayPalMobileInit,
            	makePayment:        makePayment
        	};
        	
        	function initPaymentUI() {
            	init_defer = $q.defer();
            	$ionicPlatform.ready().then(function () {
            	var clientIDs = {
            	"PayPalEnvironmentProduction": shopSettings.payPalProductionId,
            	"PayPalEnvironmentSandbox": shopSettings.payPalSandboxId
            	};
            	PayPalMobile.init(clientIDs, onPayPalMobileInit);
            	});
            	return init_defer.promise;
        	}
        	
        	function createPayment(total, name) {
        	// "Sale == > immediate payment
        	// "Auth" for payment authorization only, to be captured separately at a later time.
        	// "Order" for taking an order, with authorization and capture to be done separately at a later time.
        	   var payment = new PayPalPayment("" + total, "USD", "" + name, "Sale");
        	   return payment;
        	}
        	
        	function configuration() {
        	// for more options see `paypal-mobile-js-helper.js`
        	   var config = new PayPalConfiguration({merchantName: shopSettings.payPalShopName, merchantPrivacyPolicyURL: shopSettings.payPalMerchantPrivacyPolicyURL, merchantUserAgreementURL: shopSettings.payPalMerchantUserAgreementURL});
        	   return config;
        	}

        	function onPayPalMobileInit() {
            	$ionicPlatform.ready().then(function () {
            	// must be called
            	// use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
                	PayPalMobile.prepareToRender(shopSettings.payPalEnv, configuration(), function () {
                    	$timeout(function () {
                    	init_defer.resolve();
                	   });
            	   });
            	});
        	}
        
        	function makePayment(total, name) {
            	var defer = $q.defer();
            	total = $filter('number')(total, 2);
            	$ionicPlatform.ready().then(function () {
                	PayPalMobile.renderSinglePaymentUI(createPayment(total, name), function (result) {
                	$timeout(function () {
                	defer.resolve(result);
                	});
                	}, function (error) {
                    	$timeout(function () {
                    	defer.reject(error);
                    	});
            	   });
            	});
            	return defer.promise;
        	}
        	   return service;
        	}])


        .controller('PaypalCtrl', function ($scope,$window, $stateParams,$ionicHistory,$sce,$http,PaypalService) {

            $scope.paynow = function () {
                            $ionicHistory.clearCache();
                            $ionicHistory.clearHistory();
                            PaypalService.initPaymentUI().then(function () {

                            PaypalService.makePayment(5, "Total Amount”").then(function (response) {

                            alert("success"+JSON.stringify(response));

                                }, function (error) {

                                alert("Transaction Canceled");

                                });

                            });
           };
        })

