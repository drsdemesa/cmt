(function() {
    
    'use strict';

    angular
        .module('clientManagementTool')
        .factory('client', client);

        function client($resource) {

            // ngResource call to our static data
            var Client = $resource('data/clients.json');

            function getClient() {
                // $promise.then allows us to intercept the results
                // which we will use later
                return Client.query().$promise.then(function(results) {
                	angular.forEach(results, function(result) {
                		result.clientid = parseFloat(result.clientid);
                        result.statusStr = (result.status == 1)? "Active": "Inactive";
                    });
                    return results;
                }, function(error) { // Check for errors
                    console.log(error);
                });
            }

            return {
                getClient: getClient,
            }
        }
            
})();