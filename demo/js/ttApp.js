angular.module('ttApp', ['tinytoggle'])
  .controller('DemoNgController', function($scope) {
    
      $scope.logs = [];
      $scope.myValue = true;
      $scope.enabled = true;
      
      $scope.options = [
          {name:'Option One', val:true},
          {name:'Option Two', val:false},
          {name:'Option Three', val:true}
      ];
            
      $scope.mychange = function() {        
        $scope.log("Value changed: " + $scope.myValue );
      }
            
      $scope.myclick = function() {
        $scope.log("Control was clicked: " + $scope.myValue );
      }
            
      $scope.log = function(msg) {        
        $scope.logs.push($scope.logs.length + " " + Date() + " " + msg);
      }
      
  });