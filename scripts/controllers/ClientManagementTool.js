    
(function() {

  'use strict';
    
    angular
        .module('clientManagementTool')
        .controller('ClientManagementTool', ClientManagementTool);

        function ClientManagementTool(client) {  //drs : change this

            // vm is our capture variable
            var vm = this;				

            vm.clientEntries = [];			

             // Fetches the client entries from the static JSON file
            // and puts the results on the vm.clientEntries array
            client.getClient().then(function(results) {
                vm.clientEntries = results;
                console.log(vm.clientEntries);
            }, function(error) { // Check for errors
                console.log(error);
            });
        }
})();