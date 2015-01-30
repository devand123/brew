angular.module('brew')
	.controller('historyController', ['$scope', '$ionicLoading', '$ionicPopup', 'brewService', function ($scope, $ionicLoading, $ionicPopup, brewService) {


		$scope.init = function () {
			$scope.called = false;
			$scope.drinkHistory = [];

			brewService.getDrinkHistory()
				.then(function (drinkHistory) {
					$scope.called = true;
					$scope.drinkHistory = drinkHistory;
				});
		};
		$scope.init();

	}]);
