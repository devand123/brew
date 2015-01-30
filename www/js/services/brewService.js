angular.module('brew')
	.service('brewService', ['$http', '$q', '$window', 'httpConfig', function ($http, $q, $window, httpConfig) {
		var self = this;

		self.repo = {};


		self.searchBeer = function (beerName) {
			return $http({
				method: 'GET',
				url: httpConfig.baseURL + 'brew/search/beer/' + beerName,
			})
			.success(function (data) {
				// cache search results for detail view
				self.repo.searchResults = data;
				return data;
			});
		};


		self.getBeerDetail = function (id) {
			var def = $q.defer();
			// if searchResults does not exist, return empty object
			if(!self.repo.searchResults || !self.repo.searchResults.length) {
				if($window.localStorage.drinkHistory) {
					self.getFromDrinkHistory(id)
						.then(function (record) {
							if(record) {
								def.resolve(record);
							}
						});
				} else {
					return $q.when({});
				}
			} else {
				// loop through all search results, and find matching result per the id parameter
				angular.forEach(self.repo.searchResults, function (result) {
					if(result.id === id) {
						def.resolve(result);
					}
				});
			}

			return def.promise;
		};


		// A method that handles the default or previous history for localStorage.drinkHistory
		self.initDrinkHistory = function () {
			var def = $q.defer();
			$window.localStorage.drinkHistory = $window.localStorage.drinkHistory || JSON.stringify([]);
			def.resolve(JSON.parse($window.localStorage.drinkHistory));
			return def.promise;
		};


		self.getDrinkHistory = function () {
			var def = $q.defer();

			self.initDrinkHistory()
				.then(function (drinkHistory) {
					def.resolve(drinkHistory);
				});
			
			return def.promise;
		};


		self.addToDrinkHistory = function (drink) {
			var def = $q.defer();

			self.initDrinkHistory()
				.then(function (drinkHistory) {
					drinkHistory.push(drink);
					$window.localStorage.drinkHistory = JSON.stringify(drinkHistory);
				});
			
			return def.promise;
		};


		self.getFromDrinkHistory = function (id) {
			var def = $q.defer();

			self.getDrinkHistory()
				.then(function (drinkHistory) {
					var record;
					angular.forEach(drinkHistory, function (drink) {
						if(drink.id === id) {
							record = drink;
						}
					});
					def.resolve(record);
				});

			return def.promise;
		};


		self.checkExistsInDrinkHistory = function (id) {
			var def = $q.defer();

			self.getDrinkHistory()
				.then(function (drinkHistory) {
					var exists = false;
					angular.forEach(drinkHistory, function (drink) {
						if(drink.id === id) {
							exists = true;
						}
					});
					def.resolve(exists);
				});

			return def.promise;
		};

	}]);
