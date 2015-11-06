angular.module('app').service('morningStarService', ['$http', '$log', '_', 'reutersService',
function($http, $log, _, reutersService) {
var self = this;
self.stockObject = {};
self.newArray = [];
self.ivObject = {};
self.exchange = {};

  this.tickerOnly = function(ticker) {
    $log.log("Button was clicked");
    //NOTE morningStar CF API
    // self.apiStatus = {
    //   morningStarIS: 'Loading...'
    //   morningStarBS: 'Loading...'
    //   morningStarCF: 'Loading...'
    //   reutersService: 'Waiting...'
    // };
    $http.get("https://api.import.io/store/data/40359466-98a4-473d-bfff-d439b8cdcd96/_query?input/webpage/url=http%3A%2F%2Ffinancials.morningstar.com%2Fcash-flow%2Fcf.html%3Ft%3D"+ticker+"%26region%3Dusa%26culture%3Den-US&_user=685ff313-5202-4859-9151-5f05b6d38fa6&_apikey=685ff3135202485991515f05b6d38fa6d63e0a91e0726cd9a83c014363765dec4f93106128f4aee1f59af997f215355c549765b0e6611f4797dd2b03ef9ccc663fd9071946ee68480bdb6ba084190b2a")
    .then(function successCallback(data) {
  if (data.data.results) {
      //NOTE stockObject is for the view: in tables
        self.stockObject["cashflow"] = data.data.results[0];
        (self.stockObject.cashflow.ocf).splice(5,1);

        //NOTE newArray is for graphing
        self.newArray.splice(2,1,self.stockObject.cashflow.ocf);

        //NOTE inserting stuff inot ivObject for calculation of IV later
        self.ivObject["cashflow"] = parseFloat(_.last(self.stockObject.cashflow.ocf));
        // self.apiStatus.morningStarBS = {};
        // self.apiStatus.morningStarCF: 'successful';
    }

    else {
      $log.log("No results for MorningStar CF API");
    }
        $log.log(data);
        $log.log(self.stockObject);
      },
    function errorCallback (data) {
      $log.log("There has been an error for the Morningstar CF API");

    });

    //NOTE morningStar BS API
    $http.get("https://api.import.io/store/data/5c03d7f6-f142-43e8-9a3d-8c145bfa5a6a/_query?input/webpage/url=http%3A%2F%2Ffinancials.morningstar.com%2Fbalance-sheet%2Fbs.html%3Ft%3D"+ticker+"%26region%3Dusa%26culture%3Den-US&_user=685ff313-5202-4859-9151-5f05b6d38fa6&_apikey=685ff3135202485991515f05b6d38fa6d63e0a91e0726cd9a83c014363765dec4f93106128f4aee1f59af997f215355c549765b0e6611f4797dd2b03ef9ccc663fd9071946ee68480bdb6ba084190b2a")
    .then(function successCallback(data) {
      if (data.data.results) {
        self.stockObject["balanceSheet"] = data.data.results[0];
        //NOTE inserting stuff inot ivObject for calculation of IV later
        self.ivObject["stDebt"] = parseFloat(_.last(self.stockObject.balanceSheet.std));
        self.ivObject["ltDebt"] = parseFloat(_.last(self.stockObject.balanceSheet.ltd));
        self.ivObject["totalDebt"] = parseFloat(_.last(self.stockObject.balanceSheet.ltd)) + parseFloat(_.last(self.stockObject.balanceSheet.std));
        self.ivObject["ltDebt"] = parseFloat(_.last(self.stockObject.balanceSheet.ltd));
        self.ivObject["sti"] = parseFloat(_.last(self.stockObject.balanceSheet.sti));
        self.ivObject["cash"] = parseFloat(_.last(self.stockObject.balanceSheet.cash));
        self.ivObject["cashAndEquivalents"] = parseFloat(_.last(self.stockObject.balanceSheet.cash)) + parseFloat(_.last(self.stockObject.balanceSheet.sti));
    } else {
      $log.log("No results for MorningStar BS API");
    }
        $log.log(data);
        $log.log(self.stockObject);
      },
    function errorCallback (data) {
      $log.log("There has been an error for the Morningstar BS API");

    });
    //NOTE morningStar IS API
    $http.get("https://api.import.io/store/data/4ba2a524-7c3f-4563-bf0b-ce6d4d14d6c1/_query?input/webpage/url=http%3A%2F%2Ffinancials.morningstar.com%2Fincome-statement%2Fis.html%3Ft%3D"+ticker+"%26region%3Dusa%26culture%3Den-US&_user=685ff313-5202-4859-9151-5f05b6d38fa6&_apikey=685ff3135202485991515f05b6d38fa6d63e0a91e0726cd9a83c014363765dec4f93106128f4aee1f59af997f215355c549765b0e6611f4797dd2b03ef9ccc663fd9071946ee68480bdb6ba084190b2a")
    .then(function successCallback(data) {
      if (data.data.results) {
        self.stockObject["incomeStatement"] = data.data.results[0];
        self.stockObject.incomeStatement.revenue.splice(5,1);
        self.stockObject.incomeStatement.netincome.splice(5,1);
        var textArray = self.stockObject.incomeStatement.units.split(" ");
        $log.log(textArray);
        $log.log(textArray[7]);
        self.ivObject["units"] = textArray[7];
        self.newArray.splice(0,1,self.stockObject.incomeStatement.revenue);
        self.newArray.splice(1,1,self.stockObject.incomeStatement.netincome);


    } else {
      $log.log("No results for MorningStar IS API");
    }
        $log.log(data);
        $log.log(self.stockObject);
      },
    function errorCallback (data) {
      $log.log("There has been an error for the Morningstar IS API");

    });
    //NOTE Yahoo EPS API
    $http.get("https://api.import.io/store/data/24281222-34d8-4656-9924-fec56ada3384/_query?input/webpage/url=http%3A%2F%2Ffinance.yahoo.com%2Fq%2Fae%3Fs%3D"+ ticker +"%2BAnalyst%2BEstimates&_user=685ff313-5202-4859-9151-5f05b6d38fa6&_apikey=685ff3135202485991515f05b6d38fa6d63e0a91e0726cd9a83c014363765dec4f93106128f4aee1f59af997f215355c549765b0e6611f4797dd2b03ef9ccc663fd9071946ee68480bdb6ba084190b2a")
    .then(function successCallback(data) {
      if (data.data.results) {
        self.stockObject["yahooEPS"] = data.data.results[0];
        //NOTE inserting stuff inot ivObject for calculation of IV later
        self.ivObject["epsGrowth"] = parseFloat(_.last(self.stockObject.yahooEPS.epsest));

        //TODO NOTE get from Reuters
        // self.ivObject["stGrowth"] = parseFloat(_.last(self.stockObject.yahooEPS.ltd));
        // self.ivObject["ltGrowth"] = parseFloat(_.last(self.stockObject.yahooEPS.ltd));

    } else {
      $log.log("No results for Yahoo EPS API");
    }
        $log.log(data);
        $log.log(self.stockObject);
      },
    function errorCallback (data) {
      $log.log("There has been an error for the Morningstar BS API");

    });

    //NOTE Yahoo General API
    $http.get("https://api.import.io/store/data/66f937f8-78c5-41d8-ad26-387282b08287/_query?input/webpage/url=https%3A%2F%2Ffinance.yahoo.com%2Fq%2Fks%3Fs%3D"+ ticker +"&_user=685ff313-5202-4859-9151-5f05b6d38fa6&_apikey=685ff3135202485991515f05b6d38fa6d63e0a91e0726cd9a83c014363765dec4f93106128f4aee1f59af997f215355c549765b0e6611f4797dd2b03ef9ccc663fd9071946ee68480bdb6ba084190b2a")
    .then(function successCallback(data) {
      if (data.data.results) {
        self.stockObject["yahooGeneral"] = data.data.results[0];

        //NOTE inserting stuff inot ivObject for calculation of IV later
        self.ivObject["beta"] = parseFloat(self.stockObject.yahooGeneral.beta);
        self.ivObject["discountRate"] = self.discountRateCalculator(parseFloat(self.stockObject.yahooGeneral.beta));

        self.ivObject["price"] = parseFloat(self.stockObject.yahooGeneral.price);
        self.ivObject["sharesOutstanding"] = parseFloat(self.stockObject.yahooGeneral.sharesoutstanding);
        self.ivObject["sharesOutstandingUnit"] = (self.stockObject.yahooGeneral.sharesoutstanding.slice(-1));
        self.exchange = self.stockObject.yahooGeneral.ticker;
        $log.log(self.exchange);
        reutersService.reutersAPI(ticker, self.exchange);
    } else {
      $log.log("No results for Yahoo EPS API");
    }
        $log.log(data);
        $log.log(self.stockObject);
      },
    function errorCallback (data) {
      $log.log("There has been an error for the Morningstar BS API");

    });
  };//end tickerOnly

this.discountRateCalculator = function(beta) {
  var discRate;
  discRate = (beta * 4.5) + 2.6;
  discRate = discRate.toFixed(2);
  parseFloat(discRate);
  return discRate;
};


}]);
