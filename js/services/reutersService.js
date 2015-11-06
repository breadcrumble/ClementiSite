angular.module('app').service('reutersService',
['$http', '$log',
function($http, $log) {

var self = this;
self.reutersObject = {};
self.ivObjectR = {};
self.reutersAPI = function(ticker, exchange) {
  var exchangeSwitch = function(ex) {
     if (ex == "-NasdaqGS") {
       return "O";
     } else if (ex == "-NYSE") {
       return "N";
     } else {
       return "O";
     }
   };
   var exchangeSymbol = exchangeSwitch(exchange);

      $http.get("https://api.import.io/store/data/6fab4b3f-87c9-4777-ab36-2f47a56ff723/_query?input/webpage/url=http%3A%2F%2Fwww.reuters.com%2Ffinance%2Fstocks%2FfinancialHighlights%3Fsymbol%3D" + ticker + "." + exchangeSymbol + "&_user=685ff313-5202-4859-9151-5f05b6d38fa6&_apikey=685ff3135202485991515f05b6d38fa6d63e0a91e0726cd9a83c014363765dec4f93106128f4aee1f59af997f215355c549765b0e6611f4797dd2b03ef9ccc663fd9071946ee68480bdb6ba084190b2a")
      .then(function successCallback(data) {
    if (data) {
      $log.log("success");
      $log.log(data.data.results);

      self.reutersObject.data = data.data.results[0];
      self.ivObjectR["eps5year"] = parseFloat(self.reutersObject.data.eps5year[0]);
      self.ivObjectR["ltGrowth"] = parseFloat(self.reutersObject.data.ltgrowth[1]);



        // //NOTE stockObject is for the view: in tables
        //   self.stockObject["cashflow"] = data.data.results[0];
        //   (self.stockObject.cashflow.ocf).splice(5,1);
        //
        //   //NOTE newArray is for graphing
        //   self.newArray.splice(2,1,self.stockObject.cashflow.ocf);
        //
        //   //NOTE inserting stuff inot ivObject for calculation of IV later
        //   self.ivObject["cashflow"] = parseFloat(_.last(self.stockObject.cashflow.ocf));
        //   // self.apiStatus.morningStarBS = {};
      }

      else {
        $log.log("No results for reuters Financial API");
      }
          $log.log(data);
          $log.log(self.stockObject);
        },
      function errorCallback (data) {
        $log.log("There has been an error for the reuters Financial API");

      });
};

  this.testing = "reuters works";
}]);
