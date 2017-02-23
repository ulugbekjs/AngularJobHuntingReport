'use strict';

angular.module('myJobs.jobs', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/jobs', {
    templateUrl: 'jobs/jobs.html',
    controller: 'JobsCtrl'
  });
}])

.controller('JobsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

    var rootRef = firebase.database().ref();    
    $scope.jobs = $firebaseArray(rootRef);
    
    $scope.showAddForm = function(){
        $scope.jobShow = false;
        if($scope.addFormShow){
            $scope.addFormShow = false;
        } else {
            $scope.addFormShow = true;
        }        
    };
    
    $scope.addFormSubmit = function(){
        // date, title, company, contact
        var date = $scope.date || null;
        var title = $scope.title || null;
        var company = $scope.company || null;
        var contact = $scope.contact || null;
        
        $scope.jobs.$add({
            date: date,
            title: title,
            company: company,
            contact: contact
        }).then(function(rootRef){
            //var id = rootRef.key();
            console.log(rootRef.getKey());
            
            // clear the form
            clearFields();
            
            // hide the form
            $scope.addFormShow = false;
            
            // send msg to user
            $scope.msg = "Contact added";
            
            
        })
        
    }
    
    $scope.editFormSubmit = function(){
        
    };
    
    
    function clearFields(){
        console.log("clearing all fields");
        $scope.date = $scope.title = $scope.company = $scope.contact = '';
    }
    
    $scope.showJob = function(job) {
        $scope.job = job;
        $scope.jobShow = true;
    }
    
    
}]);