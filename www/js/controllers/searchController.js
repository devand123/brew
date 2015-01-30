angular.module('brew')
	.controller('searchController', ['$scope', '$ionicLoading', '$ionicPopup', 'brewService', function ($scope, $ionicLoading, $ionicPopup, brewService) {

		$scope.searchBeer = function () {
			$ionicLoading.show({
				template: 'Loading deliciousness..'
			});

			brewService.searchBeer($scope.beerName)
				.then(function () {
					$scope.results = brewService.repo.searchResults;
					$scope.called = true;
					$ionicLoading.hide();
				})
				.catch(function () {
					$ionicLoading.hide();
					$ionicPopup.alert({
						title: 'Whoops! An error occurred..',
						template: 'You should probably order another drink in the meantime!'
					});
				});
		};


		$scope.init = function () {
			$scope.beerName = '';
			$scope.called = false;
			$scope.results = [];
		};
		$scope.init();
		
	}]);
