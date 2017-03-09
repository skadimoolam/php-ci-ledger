angular.module('cobra-manager')

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('common', {
			url: '/common',
			template: '<div ui-view></div>',
			abstract: true
		})


		.state('common.passwords', {
			url: '/passwords',
			templateUrl: 'tpl/common/passwords.html',
			controller: function($rootScope) {
				$rootScope.currentState = "common.passwords";
				$rootScope.stateTitle = "Admin Dashboard";
			}
		})

		.state('common.apis', {
			url: '/apis',
			templateUrl: 'tpl/common/apis.html',
			controller: function($rootScope, $scope, UrlService, notify) {
				$rootScope.currentState = "common.apis";
				$rootScope.stateTitle = "User Manager";
			}
		});
});
