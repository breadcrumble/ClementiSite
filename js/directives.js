angular.module('app')
.directive('iv', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/tenSteps/iv.html'
  };
})
.directive('loading', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/tenSteps/loading.html'
  };
})

.directive('menu', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/tenSteps/menu.html'
  };
})

.directive('st', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/tenSteps/st.html'
  };
})

.directive('mt', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/tenSteps/mt.html'
  };
})

.directive('lt', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/tenSteps/lt.html'
  };
})
;
