angular.module('backOffice.services', [])

	.constant('baseUrl', 'http://192.168.43.244/jobportl/web/api/')

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
			postCategory: function(category){
				if(category.command=="Create")
					return $http({method: "POST", url: baseUrl + 'addcategories', data: category})
				else
					return $http({method: "POST", url: baseUrl + 'updatecategories', data:category})
			},
			getAllCategories: function () {
				return $http({method: "GET", url: baseUrl + 'allcategories'})
			},
			deleteCategory: function(category_id){
				return $http({method: "DELETE", url: baseUrl + 'deletecategories/' + category_id})
			}

		}
	})

	.factory('SkillService', function($http, baseUrl){
		return{
			saveSkill: function (skill) {
				return $http({method: "POST", url: baseUrl + 'addskills', data: skill})
			},
			postSkill: function(skill){
				if(skill.command == "Create")
					return $http({method: "POST", url: baseUrl + 'addskills', data: skill})
				else
					return $http({method: "POST", url: baseUrl + 'updateskills', data: skill})
			},
			getAllSkills: function () {
				return $http({method: "GET", url: baseUrl + 'allskills'})
			},
			deleteSkill: function(skill_id){
				return $http({method: "DELETE", url: baseUrl + 'deleteskills/' + skill_id})
			}


		}
	});
