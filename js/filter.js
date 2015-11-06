angular.module('app').filter('letterToUnit', function() {
    var letterToUnit = function(letter) {
      if (letter == "K") {
        return "thousands";
      }
      else if (letter == "M") {
        return "millions";
      }
      else if (letter == "B") {
        return "billions";
      }
      else {
        return "error";
      }
    };
    return letterToUnit;
  });
