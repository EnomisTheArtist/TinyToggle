
var ttApp = angular.module('ttApp', []);

ttApp.controller('ttController', function($scope, $log) {
	var ttController = this;
	
	$scope.options = [
		{name:'option_1', value:true},
		{name:'option_2', value:false},
		{name:'option_3', value:true}
	];
	
	$scope.watch($scope.options, function() {
		$log.info( $scope.options );
	})
	
	$log.info("ciao...");
});

