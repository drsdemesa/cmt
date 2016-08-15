    
(function() {

  'use strict';
    
    angular
        .module('clientManagementTool')
        .controller('ClientManagementTool', ClientManagementTool);

        function ClientManagementTool(client, $filter) {  

            // vm is our capture variable
            var vm = this;				
            vm.propertyName = 'clientid';
            vm.reverse = false;
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

            vm.sortBy = function (propertyName){
            	vm.reverse = (propertyName !== null && vm.propertyName === propertyName)
        			? !vm.reverse : false;
    			vm.propertyName = propertyName;
    			vm.clientEntries = $filter('orderBy')(vm.clientEntries, vm.propertyName, vm.reverse);
            }

            // Submits the time entry that will be called 
            // when we click the "Log Time" button
            vm.addNewClient = function() {
                vm.clientEntries.push({
                    "clientid": vm.client_id,
                    "clientname":vm.client_name,
                    "dateadded": new Date(),
                    "statusStr": vm.client_stat
                });

            }
            vm.deleteClient = function(clientid){
		          var index = -1;
		          var clientArr = eval(vm.clientEntries );
		          for( var i = 0; i < clientArr.length; i++ ) {
		                if( clientArr[i].clientid === clientid ) {
		                    index = i;
		                    break;
		                 }
		          }
		          if( index === -1 ) {
		               alert( "Something gone wrong" );
		          }
		          vm.clientEntries.splice( index, 1 );
		       };
        }
})();