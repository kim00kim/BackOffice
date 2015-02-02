angular.module('backOffice.services', [])

	.constant('baseUrl', 'http://10.20.1.198/jobportl/web/api/')

	.factory('$localstorage', ['$window', function ($window) {
		return {
			set: function (key, value) {
				$window.localStorage[key] = value;
			},
			get: function (key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function (key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function (key) {
				return JSON.parse($window.localStorage[key] || '{}');
			}
		}
	}])

	.factory('AdminService', function ($localstorage) {
		return {
			setAdmin: function (response) {
				$localstorage.setObject('admin',
					{
						admin_id: response.admin_id,
						username : response.username
					})
			},
			getAdmin: function () {
				return $localstorage.getObject('user')
			},
			clearStorage: function () {
				localStorage.clear()
			}
		}
	})

	.factory('AdminAccount', function ($http, baseUrl) {
		var admin_account = new Object();

		return {
			checkUser: function (admin_input) {
				return $http({method: "POST", url: baseUrl + 'admins', data: admin_input})
			}
		}

	})

	.factory('CategoryService', function($http, baseUrl){
		return{
			saveCategory: function (category) {
				console.log(category)
				return $http({method: "POST", url: baseUrl + 'addcategories', data: category})
			},
			getAllCategories: function () {
				return $http({method: "GET", url: baseUrl + 'allcategories'})
			}
		}
	});
