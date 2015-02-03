// Ionic Starter App

angular.module('backOffice', ['ionic', 'backOffice.controllers', 'backOffice.services'])

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
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
	})

	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('app', {
				url: "/app",
				abstract: true,
				templateUrl: "templates/menu.html",
				controller: 'AppCtrl'
			})

			.state('login',{
				url: "/login",
				templateUrl: "templates/login.html",
				controller: 'LoginCtrl'
			})

			.state('app.category', {
				url: "/categories",
				views: {
					'menuContent': {
						templateUrl: "templates/category.html",
						controller: 'CategoryCtrl'
					}
				}
			})

			.state('app.skill', {
				url: "/skills",
				views: {
					'menuContent': {
						templateUrl: "templates/skill.html",
						controller: "SkillCtrl"
					}
				}
			})

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/login');
	});
