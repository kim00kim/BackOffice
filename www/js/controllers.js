angular.module('backOffice.controllers', [])

	.controller('AppCtrl', function ($scope, $ionicPopup, AdminService, $state) {
		// Form data for the login modal

		$scope.logout = function(){
			// A confirm log out dialog
			var confirmPopup = $ionicPopup.confirm({
				title: 'Log Out',
				template: 'Confirm log out?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					AdminService.clearStorage()
					$state.go('login')
				}
			});
		}
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
					AdminService.setAdmin(response)
					$state.go('app.category')
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
			animation: 'slide-in-right', //or slide-left-right-ios7
			focusFirstInput: true
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

	.controller('SkillCtrl', function ($scope, $ionicModal,SkillService, CategoryService) {
		$scope.new_skill = {};
		$scope.skills = [];

		SkillService.getAllSkills().success(function(response){
			console.log(response)
			if(!response)
				alert("Couldn't get skills.")
			else{
				$scope.predicate = 'skill_name'
				$scope.skills = response
//				console.log($scope.categories)
			}
		})

		$ionicModal.fromTemplateUrl('templates/create-skill.html', {
			scope: $scope,
			animation: 'slide-in-right', //or slide-left-right-ios7
			focusFirstInput: true
		}).then(function (modal) {
			$scope.createSkill = modal;
			CategoryService.getAllCategories().success(function(response){
				console.log(response)
				if(!response)
					alert("Couldn't get categories.")
				else{
					$scope.categories = response
					$scope.new_skill.category=$scope.categories[0]
//				console.log($scope.categories)
				}
			})
		});

		//add category in service
		$scope.createNewSkill = function (new_skill) {
			var skill = []
			/*console.log("NEW_SKILL: " + JSON.stringify(new_skill))
			console.log(new_skill.category.category_id)*/
			 skill = ({'skill_name': new_skill.skill_name, 'category_id': new_skill.category.category_id})
			console.log(skill)
			SkillService.saveSkill(skill).success(function(response){
				console.log("Res: " + JSON.stringify(response))
				if(!response)
					alert("Couldn't save skill.")
				else{
					$scope.createSkill.hide();
					$scope.createSkill = {}
					//clean form input
					$scope.new_skill = {};
					$scope.skills.push({'skill_name' : new_skill.skill_name, 'job_category' : {'category_name' : new_skill.category.category_name} })
					console.log({})
					alert("New skill successfully created!")
				}
			})
		};
	})

	.controller('PlaylistCtrl', function ($scope, $stateParams) {
	});
