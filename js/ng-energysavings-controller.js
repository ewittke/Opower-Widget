var app = angular.module('opowerAssignment', ['ngAnimate','ngSanitize']);

app.controller('energySavingsCtrl', function($scope, $timeout) {

	// Private

	var _format = function( s ) {
		s = s.replace('{used}', $scope.types[$scope.activeType].used);
		s = s.replace('{removed}', $scope.types[$scope.activeType].removed);
		s = s.replace('{removedByEOY}', $scope.removedByEOY());
		return s;
	};

	// Public Properties -----------------------------------

	// Hardcode "removed" & "used" for now; calculate for implementation based on kWh
	$scope.types = [
		{	name: 'cars',
			removed: 5,
			used: 8, 
			_c: [
				'take {removed} cars off the road',
				'{removed} average-size cars',
				'remove {removedByEOY} cars'
			]
		},
		{	name: 'trees',
			removed: 10,
			used: 30, 
			_c: [
				'plant {removed} trees',
				'{removed} large oak trees',
				'plant {removedByEOY} trees'
			]
		},
		{	name: 'co2',
			removed: 7,
			used: 21, 
			_c: [
				'remove {removed} therms of CO2',
				'{removed} therms of CO2',
				'remove {removedByEOY} therms of CO2'
			]
		}
	];
	$scope.activeType = 0;
	$scope.removedPreload = $scope.types[$scope.activeType].removed;
	$scope.usedPreload = $scope.types[$scope.activeType].used;
	$scope.removed = 0;
	$scope.used = 0;

	// Slight delay to force onload animation
	$timeout(function(){
		$scope.removed = $scope.removedPreload;
		$scope.used = $scope.usedPreload;
	
		// Animate the bar charts
		window.setTimeout(function(){ $('.bar').removeClass('empty'); }, 1000);
	}, 1);

	// Methods -----------------------------------------------------

	$scope.setType = function( i ) {
		$scope.activeType = i;
		$scope.removed = $scope.types[$scope.activeType].removed;
		$scope.used = $scope.types[$scope.activeType].used;
	}

	$scope.removedByEOY = function() {
		return ( $scope.removed * 12 );
	};

	// For ng-repeat
	$scope.toArray = function( i ){
		return new Array( i );
	};

	$scope._c = function( i ){
		return _format( $scope.types[$scope.activeType]._c[i] );
	}
});