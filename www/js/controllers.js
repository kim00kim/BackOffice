angular.module('backOffice.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
		// Form data for the login modal
		/*$scope.loginData = {};

		 // Create the login modal that we will use later
		 $ionicModal.fromTemplateUrl('templates/login.html', {
		 scope: $scope
		 }).then(function(modal) {
		 $scope.modal = modal;
		 });

		 // Triggered in the login modal to close it
		 $scope.closeLogin = function() {
		 $scope.modal.hide();
		 };

		 // Open the login modal
		 $scope.login = function() {
		 $scope.modal.show();
		 };

		 // Perform the login action when the user submits the login form
		 $scope.doLogin = function() {
		 console.log('Doing login', $scope.loginData);

		 // Simulate a login delay. Remove this and replace with your login
		 // code if using a login system
		 $timeout(function() {
		 $scope.closeLogin();
		 }, 1000);
		 };*/

	})

	.controller('LoginCtrl', function ($scope, $state, AdminAccount, AdminService) {
		$scope.user_input={}

		$scope.login = function (input){
			console.log(input)
			AdminAccount.checkUser(input).success(function (response) {
				console.log(("Response: " +response))
				if (!response) {
					alert("Incorrect username and password!")
				}
				else {
					alert("Logged in successfully!")
					$state.go('app.category')
//					AdminService.setAdmin(response)
					//UserService.setUser(response)
					//UserService.setUserType(response.user_type)
					//var user = UserService.getUserType()
				}
			})
		}
	})

	.controller('CategoryCtrl', function ($scope, $state, $ionicModal, CategoryService) {
		$scope.new_category = {};
		$scope.categories = [];

		CategoryService.getAllCategories().success(function(response){
			console.log(response)
			if(!response)
				alert("Couldn't get categories.")
			else{
				$scope.predicate = 'category_name'
				$scope.categories = response
//				console.log($scope.categories)
			}
		})

		$ionicModal.fromTemplateUrl('templates/create-category.html', {
			scope: $scope,
			animation: 'slide-in-right' //or slide-left-right-ios7
		}).then(function (modal) {
			$scope.createCategory = modal;
		});

		//add category in service
		$scope.createNewCategory = function (new_category) {
			console.log($scope.new_category)
			CategoryService.saveCategory($scope.new_category).success(function(response){
				console.log(response)
				if(!response)
					alert("Couldn't save category.")
				else{
					$scope.createCategory.hide();
					//clean form input
					$scope.new_category = {};
					$scope.categories.push(new_category)
					alert("New category successfully created!")
				}
			})
		};
	})

	/*.controller('PlaylistsCtrl', function ($scope) {
		$scope.playlists = [
			{title: 'Reggae', id: 1},
			{title: 'Chill', id: 2},
			{title: 'Dubstep', id: 3},
			{title: 'Indie', id: 4},
			{title: 'Rap', id: 5},
			{title: 'Cowbell', id: 6}
		];
	})*/

	.controller('PlaylistCtrl', function ($scope, $stateParams) {
	});
