    
(function() {

  'use strict';
    
    angular
        .module('clientManagementTool')
        .controller('ClientManagementTool', ClientManagementTool);

        function ClientManagementTool(client) {  //drs : change this

            // vm is our capture variable
            var vm = this;				

            vm.clientEntries = [];	
            vm.stat = [
		        {val : "1", statString : "Active"},		        
		        {val : "2", statString : "Inactive"}
    		];		

             // Fetches the client entries from the static JSON file
            // and puts the results on the vm.clientEntries array
            client.getClient().then(function(results) {
                vm.clientEntries = results;
                console.log(vm.clientEntries);
            }, function(error) { // Check for errors
                console.log(error);
            });

            // Submits the time entry that will be called 
            // when we click the "Log Time" button
            vm.addNewClient = function() {
                vm.clientEntries.push({
                    "clientid":vm.client_id,
                    "clientname":vm.client_name,
                    "dateadded": new Date(),
                    "statusStr": vm.client_stat
                });

            }
        }
})();