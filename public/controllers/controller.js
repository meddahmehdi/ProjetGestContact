var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	
$scope.champTri = null;
$scope.triDescendant = false;
$scope.triContact = function(champ){
		if($scope.champTri =champ){
				$scope.triDescendant =!$scope.triDescendant;
		}else{
			$scope.champTri=champ;
			$scope.triDescendant=false;
		}			
}	
$scope.cssTri = function(champ){
	return{
		glyphicon: $scope.champTri ==champ,
		'glyphicon-chevron-up':$scope.champTri==champ && !$scope.triDescendant,
		'glyphicon-chevron-down':$scope.champTri==champ && $scope.triDescendant
		
	};
}
	
var refresh = function() {
	$http.get('/pfebase').success(function(response) {
		console.log("I got the data I requested");
		$scope.pfebase = response;
		$scope.contact = "";
	});
};

refresh();

$scope.addContact = function() {
	console.log($scope.contact);
	$http.post('/pfebase', $scope.contact).success(function(response) {
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id) {
	console.log(id);
	$http.delete('/pfebase/' + id).success(function(response) {
		refresh();
	});
};

$scope.edit = function(id) {
	console.log(id);
	$http.get('/pfebase/' + id).success(function(response) {
		$scope.contact = response;
	});
};	

$scope.update = function() {
	console.log($scope.contact._id);
	$http.put('/pfebase/' + $scope.contact._id, $scope.contact).success(function(response) {
		refresh();
	})
};

$scope.deselect = function() {
	$scope.contact = "";
}

}]);﻿