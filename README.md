# ionic-paypal-sdk-demo

This is a paypal sdk demo for ionicV1.Paypal sdk uses native comonents for both platform(Android/iOS) By using Cordova/Phonegap.

# Installation
1) First install running this command cordova plugin add com.paypal.cordova.mobilesdk in your folder
2) Copy paypal-mobile-js-helper and cdv-plugin-paypal-mobile-sdk js files from www folder and paste into your project js folder.And payPalService.js file also
3) Add reference of these files into your index.js file

        <script src=”paypal-mobile-js-helper.js”></script>

        <script src=”cdv-plugin-paypal-mobile-sdk.js”></script>

        <script src=”js/payPalService.js”></script>
4) add constants in js file and put payPalSandboxId in constant file
5) Replace PayPalSandboxId and payPal Production Id with your send box Id and production client id
6) use paypal controller and paypal.html for clicking the button and payment

      PaypalService.makePayment(90, “Total Amount”).then(function (response) {

      alert(“success”+JSON.stringify(response));

      }, function (error) {

      alert(“Transaction Canceled”);

      });