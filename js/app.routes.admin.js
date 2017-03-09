angular.module('cobra-manager')

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('admin', {
			url: '/admin',
			templateUrl: 'tpl/admin/admin.html',
			controller: function($rootScope, $scope, $state) {
				$rootScope.currentState = "admin";
				if (!$rootScope.ssGet('loggedIn')) {
					$state.go('login');
				};
			}
		})


		.state('admin.dashboard', {
			url: '/dashboard',
			templateUrl: 'tpl/admin/dashboard.html',
			controller: function($rootScope) {
				$rootScope.currentState = "admin.dashboard";
				$rootScope.stateTitle = "Admin Dashboard";
			}
		})

		.state('admin.addnew', {
			url: '/addnew',
			templateUrl: 'tpl/admin/addnew.html',
			controller: function($rootScope, $scope, UrlService, notify) {
				var userData = $rootScope.lsGet('user-data', true);
				$rootScope.currentState = "admin.addnew";
				$rootScope.stateTitle = "User Manager";
				$scope.selectedUser = {};
				$scope.registerForm = {};

				$scope.register = function () {
					$rootScope.req(UrlService.get('register'), "POST", $scope.registerForm, false, function (resp) {
						if (resp.code === "success") {
							notify({ message: resp.message, duration: 2000, position: 'right' });
							getAllUserData();
							$scope.registerForm = {};
						} else {
							notify({ message: resp.message, duration: 2000, position: 'right' });
						}
					});
				};

				$scope.openDeleteModal = function(modalId, scopeVar, data) {
					$(modalId).modal('show');
					$scope[scopeVar] = data;
					$scope.safeApply();
				};

				$scope.deleteUser = function() {
					// $rootScope.req(UrlService.get('delete_group') + $scope.selectedUser.group_id, "DELETE", null, false, function(data) {
					// 	notify({ message: data.message, duration: 2000, position: 'right' });
					// 	$scope.selectedUser = {};
					// });
					alert("user deleted");
				};

				function getAllUserData() {
					$rootScope.req(UrlService.get('users_info'), "GET", null, false, function(resp) {
						if (resp.code === "success") {
							$scope.usersInfo = resp.data;
						} else {
							notify({ message: resp.message, duration: 2000, position: 'right' });
						}
					});
				};

				getAllUserData();
			}
		})

		.state('admin.passwords', {
			url: '/passwords',
			templateUrl: 'tpl/common/passwords.html',
			controller: function($rootScope) {
				$rootScope.currentState = "admin.passwords";
				$rootScope.stateTitle = "Password Manager";
			}
		})

		.state('admin.apis', {
			url: '/apis',
			templateUrl: 'tpl/common/apis.html',
			controller: function($rootScope, $scope, UrlService, notify) {
				$rootScope.currentState = "admin.apis";
				$rootScope.stateTitle = "Api Manager";
			}
		})

		.state('admin.ledger', {
			url: '/ledger',
			templateUrl: 'tpl/admin/ledger.html',
			controller: function($rootScope, $scope, UrlService, notify) {
				$rootScope.currentState = "admin.ledger";
				$rootScope.stateTitle = "Ledger";
				$scope.profile = $rootScope.lsGet('user-data', true);

				$scope.logEntry = function() {
					$scope.ledgerForm.transactionBy = $scope.profile.id;
					$rootScope.req(UrlService.get('ledger_add'), "POST", $scope.ledgerForm, false, function(resp) {
						if (resp.code == "success" || resp.code == "error") {
							notify({ message: resp.message, duration: 2000, position: 'right' });
						};

						$scope.ledgerForm = {};
						$rootScope.req(UrlService.get('ledger_total'), "GET", null, false, function(resp) {
							$scope.ledgerTotal = resp.data;
						});

						$rootScope.req(UrlService.get('ledger_log'), "GET", null, false, function(resp) {
							$scope.dataSet = JSON.parse(resp.data);
						});
					});
				}

				$rootScope.req(UrlService.get('ledger_total'), "GET", null, false, function(resp) {
					$scope.ledgerTotal = resp.data;
				});

				$rootScope.req(UrlService.get('ledger_log'), "GET", null, false, function(resp) {
					$scope.dataSet = JSON.parse(resp.data);
				});
			}
		})

		.state('admin.settings', {
			url: '/settings',
			templateUrl: 'tpl/admin/settings.html',
			controller: function($rootScope, $scope, UrlService) {
				$rootScoe.currentState = "admin.settings";
				$rootScope.stateTitle = "Profile Setting";
				$scope.profile = $rootScope.lsGet('user-data', true);

				$scope.updateProfile = function() {
					$rootScope.req(UrlService.get('profile_update'), "POST", $scope.profile, false, function(resp) {
						if (resp.code === "success") {
							notify({ message: resp.message, duration: 2000, position: 'right' });
							$rootScope.req(UrlService.get('profile_info'), "POST", $scope.profile, false, function(resp) {
								$rootScope.lsSet('user-data', resp.data, true);
							});
						} else {
							notify({ message: resp.message, duration: 2000, position: 'right' });
						}
					});
				};
			}
		});
});
