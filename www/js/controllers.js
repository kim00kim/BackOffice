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
					AdminService.setAdmin(response)
					$state.go('app.category')
				}
			})
		}
	})

	.controller('CategoryCtrl', function ($scope, $state, $ionicModal, $ionicLoading, CategoryService, $ionicPopup) {
		$scope.new_category = {};
		$scope.categories = [];

        var display = function(){
            $ionicLoading.show({
                content: 'Loading...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 500,
                showDelay: 0
            });
            CategoryService.getAllCategories().success(function(response){
                $ionicLoading.hide()
                console.log(response)
                if(!response)
                    alert("Couldn't get categories.")
                else{
                    $scope.predicate = 'category_name'
                    $scope.categories = response
//				console.log($scope.categories)
                }
            })
        }

		$scope.delete = function(category_id, category_name){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete ' + category_name,
				template: 'Warning: This will delete all skills under this category.' +
						'<br><br>Confirm delete ' + category_name + '?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					CategoryService.deleteCategory(category_id).success(function(response){
						display()
					})
				}
			});
		}

		$scope.update = function(category){
			console.log(category)
			$ionicModal.fromTemplateUrl('templates/category-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.createCategory = modal;
				$scope.command = "Update"
				$scope.cat=category
				$scope.cat.command=$scope.command
				$scope.createCategory .show()
			});
		}


        $scope.openModal = function(){
            $ionicModal.fromTemplateUrl('templates/category-modal.html', {
                scope: $scope,
                animation: 'slide-in-right', //or slide-left-right-ios7
                focusFirstInput: true
            }).then(function (modal) {
                $scope.createCategory = modal;
				$scope.command = "Create"
				$scope.cat= {'command' : $scope.command}
                $scope.createCategory.show()
            });
        }
		//add category in service
		$scope.commandCategory = function (category) {
			console.log(category)
			CategoryService.postCategory(category).success(function(response){
				console.log(response)
				if(!response)
					alert("Couldn't " + category.command+" category.")
				else{
					$scope.createCategory.hide();
					//clean form input
					$scope.cat = {};
					display()
				}
			})
		}
		//display categories on load
		display()
	})

	.controller('SkillCtrl', function ($scope, $ionicModal,SkillService, CategoryService, $ionicLoading, $ionicPopup) {
		$scope.new_skill = {};
		$scope.skills = [];

        var display = function () {
            $ionicLoading.show({
                content: 'Loading...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 500,
                showDelay: 0
            });
            SkillService.getAllSkills().success(function(response){
                $ionicLoading.hide()
                console.log(response)
                if(!response)
                    alert("Couldn't get skills.")
                else{
                    $scope.predicate = 'skill_name'
                    $scope.skills = response
                }
            })
        }

        $scope.openModal = function () {
            $ionicModal.fromTemplateUrl('templates/skill-modal.html', {
                scope: $scope,
                animation: 'slide-in-right', //or slide-left-right-ios7
                focusFirstInput: true
            }).then(function (modal) {
                $scope.createSkill = modal;
				$scope.command= "Create"
				$scope.new_skill= {'command' : $scope.command}
                $scope.createSkill.show()
                CategoryService.getAllCategories().success(function(response){
                    console.log(response)
                    if(!response)
                        alert("Couldn't get categories.")
                    else{
                        $scope.categories = response
                        $scope.new_skill.category=$scope.categories[0]
                    }
                })
            });

        }

		//add skill in service
		$scope.commandSkill = function (new_skill) {
			new_skill['category_id']= new_skill.category.category_id
			SkillService.postSkill(new_skill).success(function(response){
				console.log("Res: " + JSON.stringify(response))
				if(!response)
					alert("Couldn't save skill.")
				else{
					$scope.createSkill.hide();
					$scope.createSkill = {}
					//clean form input
					$scope.new_skill = {};
					display()
				}
			})
		};

		$scope.update = function(skill){
			console.log(skill)
			$ionicModal.fromTemplateUrl('templates/skill-modal.html', {
				scope: $scope,
				animation: 'slide-in-right', //or slide-left-right-ios7
				focusFirstInput: true
			}).then(function (modal) {
				$scope.createSkill = modal;
				$scope.command = "Update"
				$scope.skill=skill
				$scope.skill.command=$scope.command
				$scope.createSkill.show()
				CategoryService.getAllCategories().success(function(response){
					console.log(response)
					if(!response)
						alert("Couldn't get categories.")
					else{
						$scope.new_skill=skill
						$scope.categories = response
						$scope.new_skill.category=skill.category
					}
				})
			});
		}

		$scope.delete = function(skill_id, skill_name){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete ' + skill_name,
				template: 'Warning: This will generate NULL values for job posts using this skill.' +
					'<br><br>Confirm delete ' + skill_name + '?'
			});
			confirmPopup.then(function (res) {
				if (res) {
					SkillService.deleteSkill(skill_id).success(function(response){
						console.log(response)
						display()
					})
				}
			});
		}

		//display on load
		display()
	})

	.controller('PlaylistCtrl', function ($scope, $stateParams) {
	});
