angular.module('app').service('ivService',
['_', '$log', function(_, $log) {
/*note pseudo code

*/

this.finalIV;
var projectedCF = function(ocf, stGrowth, ltGrowth) {
   var array = [];
   stGrowth = stGrowth / 100;
   ltGrowth = ltGrowth / 100;
  //  array.push(ocf);
   for (var i = 0; i < 3; i++) {
     ocf *= (1 + stGrowth);
     array.push(ocf);
   }
   for (var i = 0; i < 7; i++) {
     ocf *= (1 + ltGrowth);
     array.push(ocf);
   }
   return array;
 };

 var discountValue = function(projCF, discFactor) {
       var array = [],
         discValue;
       for (var i = 0; i < 10; i++) {
         discValue = projCF[i] * discFactor[i];
         array.push(discValue);
       }
       return array;
     };

 var discountArrayFn = function(discRate) {
   var disc = 1 / (1 + discRate / 100);
   var array = [];
   array.push(disc);
   for (var i = 0; i < 9; i++) {
     disc = disc / (1 + discRate / 100);
     array.push(disc);
   }
   return array;
 };
 var sumArray = function(array) {
           var num = 0;
           for (var i = 0; i < array.length; i++) {
             num += array[i];
           }
           return num;
         };

    //TODO
var objectToIV = function(msObject, rObject) {
  var ocf, cashAndEq, totalDebt, stGrowth, ltGrowth, sharesOutstanding, discountRate, shareUnits;
ocf = msObject.cashflow;
cashAndEq = msObject.cashAndEquivalents;
totalDebt = msObject.totalDebt;
stGrowth = rObject.eps5year;
ltGrowth = rObject.ltGrowth;
sharesOutstanding = msObject.sharesOutstanding;
discountRate = msObject.discountRate;
shareUnits = msObject.sharesOutstandingUnit;
//just run this fn
var result = calcIV(ocf, cashAndEq, totalDebt, stGrowth, ltGrowth, sharesOutstanding, discountRate, shareUnits);
return result;
};
this.objectToIV = objectToIV;
//TODO
var unitsCompensation = function(shareUnits) {

    if (shareUnits == "K") {
      return 1000;
    }
    else if (shareUnits == "M") {
      return 1;
    }
    else if (shareUnits == "B") {
      return 0.001;
    }

};

var self = this;
self.ivResult = {};
var calcIV = function(ocf, cashAndEq, totalDebt, stGrowth, ltGrowth, sharesOutstanding, discountRate, shareUnits) {
  var projCF, discFactor, final, pv, totalIV, finalIV, factor;

  projCF = projectedCF(ocf, stGrowth, ltGrowth);
  $log.log(projCF);

  discFactor = discountArrayFn(discountRate);
  $log.log(discFactor);

  final = discountValue(projCF, discFactor);
  $log.log(final);

  pv = sumArray(final);
  $log.log(pv);
  self.ivResult.pv = pv;
  totalIV = parseFloat(pv + cashAndEq - totalDebt);
    $log.log(totalIV);
    self.ivResult.totalIV = totalIV;
    $log.log(self.ivResult);
  finalIV = totalIV / sharesOutstanding;
    $log.log(finalIV);

  factor =  unitsCompensation(shareUnits);
  $log.log(factor);
  finalIV *= factor;
  $log.log(finalIV);
  self.ivResult.finalIV = finalIV;
  $log.log(self.ivResult);
 return finalIV;

 //this.finalIV = ???
};


  this.testing = "ivService works";
}]);
