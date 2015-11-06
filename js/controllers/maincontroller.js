angular.module('app')

.controller('MainController', ['$scope', '$http', '$log', '$anchorScroll', '$location', 'morningStarService', 'reutersService', '_', 'ivService',
function($scope, $http, $log, $anchorScroll, $location, morningStarService, reutersService, _, ivService) {
// $scope.ivCalcDummyMS = { "epsGrowth": 1.88, "beta": 1, "discountRate": "7.10", "price": null, "sharesOutstanding": 5.58, "sharesOutstandingUnit": "B", "cashflow": 81266, "stDebt": 10, "ltDebt": 53, "totalDebt": 63, "sti": 20481, "cash": 21120, "cashAndEquivalents": 41601 };
// $scope.ivCalcDummyR = { "eps5year": 33.61, "ltGrowth": 15.34 };
$scope.objectToIV = ivService.objectToIV;
// $scope.objectToIV($scope.ivCalcDummyMS, $scope.ivCalcDummyR);
$scope.ivObjectR = reutersService.ivObjectR;
$scope.reutersObject = reutersService.reutersObject;
$log.log(ivService.testing + " " + reutersService.testing);
$scope.ivResult = ivService.ivResult;
$scope.testfn = function() {
  $log.log("ok");
};
//NOTE AUTOSCROLL function
  $scope.scrollTo = function(id) {
       $location.hash(id);
       $anchorScroll();
    };
//NOTE Chart function
    $scope.chartArray = [
      [0, 0, 1, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0]
    ];
    $scope.labels = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
   $scope.series = ['Sales', 'Net Income', 'Cashflow'];

//NOTE API

  $scope.title = "WA 10 Steps";
  //NOTE three morningstar API from Morningstar Service
//wtf i dont think this works????
$scope.stockObject = _.extend(morningStarService.stockObject, reutersService.stockObject);

$scope.tickerOnly = morningStarService.tickerOnly;
$scope.exchange = morningStarService.exchange;
//NOTE newarray is the array for the chart
$scope.newArray = morningStarService.newArray;
//NOTE test data

$scope.ivObjectMS = morningStarService.ivObject;
}]);
