// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('brew', ['ionic'])

.run(['$rootScope', '$state', '$ionicPlatform', function($rootScope, $state, $ionicPlatform) {

  // Store previous state for back button
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $state.previous = fromState;
  });


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('dash', {
      url: '/dash',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

  // Each tab has its own nav history stack:

  .state('dash.search', {
    url: '/search',
    views: {
      search: {
        templateUrl: 'templates/search.html',
        controller: 'searchController'
      }
    }
  })

  .state('dash.beer-detail', {
    url: '/beer-detail/:beerId',
    cache: false,
    views: {
      search: {
        templateUrl: 'templates/beer-detail.html',
        controller: 'beerDetailController'
      }
    }
  })

  .state('dash.history', {
    url: '/history',
    cache: false,
    views: {
      history: {
        templateUrl: 'templates/history.html',
        controller: 'historyController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash/history');

}]);
