angular.module('app')
.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('calculator', {
        url: '/calculator',
        templateUrl: 'partials/calculator.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'partials/about.html'
      });
  });
