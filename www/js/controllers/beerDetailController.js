angular.module('brew')
	.controller('beerDetailController', ['$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', 'brewService', function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, brewService) {

		// Just go back to search view
		$scope.goBack = function () {
			$state.go('dash.search');
		};


		$scope.addToDrinkHistory = function () {
			brewService.addToDrinkHistory($scope.beer);
			$scope.hasBeenDrank = true;
		};


		$scope.checkExistsInDrinkHistory = function (beerId) {
			brewService.checkExistsInDrinkHistory(beerId)
				.then(function (exists) {
					$scope.hasBeenDrank = exists;
				});
		};


		$scope.init = function () {
			$scope.beer = {};
			$scope.hasBeenDrank = false;

			brewService.getBeerDetail($stateParams.beerId)
				.then(function (beer) {
					$scope.beer = beer;
					$scope.checkExistsInDrinkHistory(beer.id);
				});
		};
		$scope.init();

	}]);
