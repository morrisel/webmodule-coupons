var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $window, $filter) {
	$scope.infoMessage = "";
	$scope.errorMessage = "";
	
	$scope.cdate = new Date();

	
//	/coupons/Admin
	
	$scope.adminURL="/couponproject/coupons/admin";
	$scope.customerURL="/couponproject/coupons/customer";
	$scope.companyURL="/couponproject/coupons/company";
	
	//check whether input field is empty
	function isEmpty(str){
		if((str==null)||(str=="")){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.login=function(){
		if(
				isEmpty($scope.user.login)||
				isEmpty($scope.user.password)
				)
		{ 
			emptyAlert();
		}else
		{
		 $http.post($scope.adminURL+"/login", angular.toJson($scope.user)).then(
			function(response){
				$scope.infoMessage = response.data.message;
				$scope.errorMessage = "";
			}, 
			function(response){
				$scope.infoMessage = "";
				$scope.errorMessage = response.data.message;
			}
		 );
		}
	};
	
	$scope.customerlogin=function(){
		if(
				isEmpty($scope.customeruser.login)||
				isEmpty($scope.customeruser.password)
				)
		{ 
			emptyAlert();
		}else
		{
		 $http.post($scope.customerURL+"/login", angular.toJson($scope.customeruser)).then(
			function(response){
				$scope.infoMessage = response.data.message;
				$scope.errorMessage = "";
			}, 
			function(response){
				$scope.infoMessage = "";
				$scope.errorMessage = response.data.message;
			}
		 );
		}
	};
	
	$scope.companylogin=function(){
		if(
				isEmpty($scope.companyuser.login)||
				isEmpty($scope.companyuser.password)
				)
		{ 
			emptyAlert();
		}else
		{
		 $http.post($scope.companyURL+"/login", angular.toJson($scope.companyuser)).then(
			function(response){
				$scope.infoMessage = response.data.message;
				$scope.errorMessage = "";
			}, 
			function(response){
				$scope.infoMessage = "";
				$scope.errorMessage = response.data.message;
			}
		 );
		}
	};
	
	$scope.logout=function(){
		$http.post($scope.adminURL+"/logout").then(
				function(response){
					$scope.infoMessage = response.data.message;
					$scope.errorMessage = "";
				}, 
				function(response){
					$scope.infoMessage = "";
					$scope.errorMessage = response.data.message;
				}
			 );
	}
	
	$scope.customerlogout=function(){
		$http.post($scope.customerURL+"/logout").then(
				function(response){
					$scope.infoMessage = response.data.message;
					$scope.errorMessage = "";
				}, 
				function(response){
					$scope.infoMessage = "";
					$scope.errorMessage = response.data.message;
				}
			 );
	}
	
	$scope.companylogout=function(){
		$http.post($scope.companyURL+"/logout").then(
				function(response){
					$scope.infoMessage = response.data.message;
					$scope.errorMessage = "";
				}, 
				function(response){
					$scope.infoMessage = "";
					$scope.errorMessage = response.data.message;
				}
			 );
	}
	
	//clearing fields when changing a tab
	$scope.clearAll=function(){	
		$scope.infoMessage = "";
		$scope.errorMessage = "";
		$scope.user= null;
		$scope.newCompany= null;
		$scope.company=null;
		$scope.newcustomer=null;
		$scope.customer=null;
		$scope.customeruser=null;
		$scope.obtaincoupon=null;
		$scope.companyuser=null;
		$scope.newcoupon=null;
		$scope.getcoupon=null;
		  
		$scope.$apply();
	};
	
	function emptyAlert(){
		$window.alert("all necrssary fields must be filled");		
	}
	
	function printCompanies(){
		setTimeout(function () {
			var el = document.getElementById('companies');
            angular.element(el).triggerHandler('click');							
		}, 0);
	}
	
	function printCoupons(){
		setTimeout(function () {
			var el = document.getElementById('companyCoupons');
            angular.element(el).triggerHandler('click');							
		}, 0);
	}
	
	
	function printCustomers(){
		setTimeout(function () {
			var el = document.getElementById('customers');
            angular.element(el).triggerHandler('click');						
		}, 0);
	}
	
	$scope.createNewCompany=function(){
		//dummies
		$scope.newCompany.id=1;
		$scope.newCompany.coupons=null;
		
		
		if(
				isEmpty($scope.newCompany.email)||
				isEmpty($scope.newCompany.companyName)||
				isEmpty($scope.newCompany.password) 	
				)
		{
			emptyAlert();
		}else{
			$http.post($scope.adminURL+"/createnewcompany", angular.toJson($scope.newCompany)).then(
					function(response){
						$scope.infoMessage = response.data.message;
						$scope.errorMessage = "";
						printCompanies();
						$scope.$apply();
					},
					function(response){
						$scope.infoMessage = "";
						$scope.errorMessage = response.data.message;
					}
			);
		}		
	}

	$scope.obtainCoupon=function(){
		$http.post($scope.customerURL+"/obtaincoupon/"+$scope.obtaincoupon.couponid).then(
				function(response){
					$scope.infoMessage = response.data.message;
					$scope.errorMessage = "";
					setTimeout(function () {
						var el = document.getElementById('customerCoupons');
			            angular.element(el).triggerHandler('click');						
					}, 0);
				}, 
				function(response){
					$scope.infoMessage = "";
					$scope.errorMessage = response.data.message;
				});
	}
	
	$scope.getCompany=function(){
		if(isEmpty($scope.company.id))
		{
			emptyAlert();
		}else{
			$http.get($scope.adminURL+"/getcompany/"+$scope.company.id).then(
					function(response){
						$scope.company=response.data;
						$scope.infoMessage = "";
						$scope.errorMessage = "";
						$scope.$apply();
					}, 
					function(response){
						$scope.infoMessage = "";
						$scope.errorMessage = response.data.message;
					}
			);
			
		}		
	}
	
	
	
	  $scope.removeCompany = function() {
			  if(isEmpty($scope.company.id))
				{
					emptyAlert();
				}else{
					if($window.confirm('are you sure you want to delete company '+$scope.company.id+' ?')){
						$http.delete($scope.adminURL+"/removecompany/"+$scope.company.id).then(
								function(response){
									$scope.company=null;
									$scope.infoMessage = response.data.message;
									$scope.errorMessage = "";
									printCompanies();
									$scope.$apply();
								}, 
								function(response){
									$scope.infoMessage = "";
									$scope.errorMessage = response.data.message;
								}
						);
				}	
		  }
	  }
	  
	  $scope.updateCompany = function() {
		  $scope.company.coupons=null;
		  if(
				  isEmpty($scope.company.id)||
				  isEmpty($scope.company.password)||
				  isEmpty($scope.company.email)
				  )
		  {
			  emptyAlert();
		  }else{
			  if($window.confirm('are you sure you want to update company '+$scope.company.id+' ?')){
				  $http.put($scope.adminURL+"/updatecompany",angular.toJson($scope.company)).then(
						  function(response){
							  $scope.infoMessage = response.data.message;
							  $scope.errorMessage = "";
   							  printCompanies();
   							  $scope.$apply();
						  }, 
						  function(response){
							  $scope.infoMessage = "";
							  $scope.errorMessage = response.data.message;
						  }
				  );
			  }	
		  }
	  }
	  
	  $scope.getAllCustomers = function() {
		  $http.get($scope.adminURL+"/getallcustomers").then(
				  function(response){
					  $scope.customers = response.data;
					  $scope.companies=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
				  }
		  );
	  }
	  
	  $scope.getAllCoupons=function(){
		  $http.get($scope.customerURL+"/getallcoupons").then(
				  function(response){
					  $scope.allCoupons = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";
					  $scope.customerCoupons=null;
					  $scope.customerCouponsByType=null;
					  $scope.customerCouponByPrice=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.customerCoupons=null;
					  $scope.customerCouponsByType=null;
					  $scope.customerCouponByPrice=null;
					  $scope.allCoupons=null
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
				  }
		  );
	  }
	  
	  $scope.getAllCustomerCoupons=function(){
		  $http.get($scope.customerURL+"/getallcouponsres").then(
				  function(response){
					  $scope.customerCoupons = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";
					  $scope.allCoupons=null;
					  $scope.customerCouponsByType=null;
					  $scope.customerCouponByPrice=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.customerCoupons=null;
					  $scope.customerCouponsByType=null;
					  $scope.customerCouponByPrice=null;
					  $scope.allCoupons=null
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
				  }
		  );
	  }
	  
	  $scope.getCustomerCouponsByType=function(){
		  if(!isEmpty($scope.customerCouponsByType.ctype)){
		  $http.get($scope.customerURL+"/getcouponsbytype/"+$scope.customerCouponsByType.ctype).then(
				  function(response){
					  $scope.customerCouponsByType = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";
					  $scope.allCoupons=null;
					  $scope.customerCoupons=null;
					  $scope.customerCouponByPrice=null;
					  
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.customerCouponByPrice=null;
					  $scope.allCoupons=null;
					  $scope.customerCoupons=null;
					  $scope.customerCouponsByType=null;
					  
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
				  }
		  );
		  }
	  }
	  
	  $scope.clearCustomerSheet=function(){
		  $scope.customerCoupons=null;
		  $scope.customerCouponsByType=null;
		  $scope.customerCouponByPrice=null;
		  $scope.allCoupons=null
	  }
	  
	  $scope.getCustomerCouponByPrice=function(){
		  if(!isEmpty($scope.custCPrice.price)){
		  $http.get($scope.customerURL+"/getcouponsbyprice/"+$scope.custCPrice.price).then(
				  function(response){
					  $scope.customerCouponByPrice = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";
					  $scope.allCoupons=null;
					  $scope.customerCoupons=null;
					  $scope.customerCouponsByType=null;
					  
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.customerCoupons=null;
					  $scope.customerCouponsByType=null;
					  $scope.customerCouponByPrice=null;
					  $scope.allCoupons=null
					  
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
				  }
		  		
		  );
		  }
	  }
	  
	  $scope.getCompanyList = function() {
		  $http.get($scope.adminURL+"/getcompanylist").then(
				  function(response){
					  $scope.companies = response.data;
					  $scope.customers=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
				  }
		  );
	  }
	  
	  $scope.cleatSheet=function(){
		  $scope.customers=null;
		  $scope.companies=null;
	  }
	  
	  $scope.createCustomer=function(){
			//dummies
			$scope.newcustomer.id=1;
			$scope.newcustomer.coupons=null;
			
			if(
					isEmpty($scope.newcustomer.custName)||
					isEmpty($scope.newcustomer.password) 	
					)
			{
				emptyAlert();
			}else{
				$http.post($scope.adminURL+"/addcustomer", angular.toJson($scope.newcustomer)).then(
						function(response){
							$scope.infoMessage = response.data.message;
							$scope.errorMessage = "";
							printCustomers();
						},
						function(response){
							$scope.infoMessage = "";
							$scope.errorMessage = response.data.message;
						}
				);
			}		
		}
	  
	  $scope.getCustomer=function(){
			if(isEmpty($scope.customer.id))
			{
				emptyAlert();
			}else{
				$http.get($scope.adminURL+"/getcustomer/"+$scope.customer.id).then(
						function(response){
							$scope.customer = response.data;
							$scope.errorMessage = "";
						},
						function(response){
							$scope.infoMessage = "";
							$scope.errorMessage = response.data.message;
						}
				);
			}		
	  }
	  
	  $scope.updateCustomer=function(){
//		  	$scope.customer.coupons=null;
			if(
					isEmpty($scope.customer.id)||
					isEmpty($scope.customer.password)
//					isEmpty($scope.customer.custName)
					)
			{
				emptyAlert();
			}else{
				$http.put($scope.adminURL+"/updatecustomer/", angular.toJson($scope.customer)).then(
						function(response){
							$scope.infoMessage = response.data.message;
							$scope.errorMessage = "";
							printCustomers();
						},
						function(response){
							$scope.infoMessage = "";
							$scope.errorMessage = response.data.message;
						}
				);
			}		
	  }
	  
	  $scope.removeCustomer=function(){
			if(isEmpty($scope.customer.id))
			{
				emptyAlert();
			}else{
				$http.delete($scope.adminURL+"/removecustomer/"+$scope.customer.id).then(
						function(response){
							$scope.infoMessage = response.data.message;
							$scope.errorMessage = "";
							$scope.customer=null;
							printCustomers();
						},
						function(response){
							$scope.infoMessage = "";
							$scope.errorMessage = response.data.message;
						}
				);
			}		
	  }

	  
	  
	  
	  $scope.getAllCompanyCoupons=function(){
		  $http.get($scope.companyURL+"/getallcompanycoupons").then(
				  function(response){
					  $scope.companyCoupons = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";

					  $scope.companyCouponsByDate=null;
					  $scope.comanyCouponByPrice=null;
					  $scope.companyCouponsByType=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.companyCouponsByDate=null;
					  $scope.comanyCouponByPrice=null;
					  $scope.companyCouponsByType=null;
					  $scope.companyCoupons=null;
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
					  $scope.$apply();
				  }
		  );
	  }
	  
	  $scope.getCompanyCouponsByType=function(){
		  if(!isEmpty($scope.companyCouponsByType.ctype)){
		  $http.get($scope.companyURL+"/getcouponsbytype/"+$scope.companyCouponsByType.ctype).then(
				  function(response){
					  $scope.companyCouponsByType = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";

					  $scope.companyCouponsByDate=null;
					  $scope.comanyCouponByPrice=null;
					  $scope.companyCoupons=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.companyCouponsByDate=null;
					  $scope.comanyCouponByPrice=null;
					  $scope.companyCouponsByType=null;
					  $scope.companyCoupons=null;
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
					  $scope.$apply();
				  }
		  );
		  }
	  }
	  
	  $scope.getComanyCouponByPrice=function(){
		  if(!isEmpty($scope.compCPrice.price)){
		  $http.get($scope.companyURL+"/getcouponsbyprice/"+$scope.compCPrice.price).then(
				  function(response){
					  $scope.comanyCouponByPrice = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";
					  
					  $scope.companyCouponsByDate=null;
					  $scope.companyCouponsByType=null;
					  $scope.companyCoupons=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.companyCouponsByDate=null;
					  $scope.comanyCouponByPrice=null;
					  $scope.companyCouponsByType=null;
					  $scope.companyCoupons=null;
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
					  $scope.$apply();
				  }
		  );
		  }
	  }
	  
	  $scope.getCompanyCouponsByDate=function(){
		  if(!isEmpty($scope.cdate)){
		  $http.get($scope.companyURL+"/getcouponsbydate/"+$scope.cdate).then(
				  function(response){
					  $scope.companyCouponsByDate = response.data;
					  $scope.infoMessage = "";
					  $scope.errorMessage = "";
					  
					  $scope.comanyCouponByPrice=null;
					  $scope.companyCouponsByType=null;
					  $scope.companyCoupons=null;
					  $scope.$apply();
				  }, 
				  function(response){
					  $scope.companyCouponsByDate=null;
					  $scope.comanyCouponByPrice=null;
					  $scope.companyCouponsByType=null;
					  $scope.companyCoupons=null;
					  $scope.infoMessage = "";
					  $scope.errorMessage = response.data.message;
					  $scope.$apply();
				  }
		  );
		  }
	  }

	  $scope.clearCompanySheet=function(){
		  $scope.companyCouponsByDate=null;
		  $scope.comanyCouponByPrice=null;
		  $scope.companyCouponsByType=null;
		  $scope.companyCoupons=null;
		  $scope.$apply();
	  }
	  
	  $scope.createCoupon=function(){

		  	$scope.newcoupon.id=1;		  
			if(
					isEmpty($scope.newcoupon.title)||
					isEmpty($scope.newcoupon.startDate)||
					isEmpty($scope.newcoupon.endDate)||
					isEmpty($scope.newcoupon.amount)||
					isEmpty($scope.newcoupon.type)||
					isEmpty($scope.newcoupon.message)||
					isEmpty($scope.newcoupon.price)||
					isEmpty($scope.newcoupon.image)
					)
			{
				emptyAlert();
			}else{
				$http.post($scope.companyURL+"/addnewcoupon", angular.toJson($scope.newcoupon)).then(
						function(response){
							$scope.infoMessage = response.data.message;
							$scope.errorMessage = "";
							$scope.getAllCompanyCoupons();
						},
						function(response){
							$scope.infoMessage = "";
							$scope.errorMessage = response.data.message;
						}
				);
			}	
	  }
	  
	  
	  $scope.getCoupon=function(){
		  if(isEmpty($scope.getcoupon.id)){emptyAlert();}else{
			  $http.get($scope.companyURL+"/getcouponres/"+$scope.getcoupon.id).then (
					function(response){
						$scope.getcoupon = response.data;
						$scope.getcoupon.startDate=new Date($scope.getcoupon.startDate);
						$scope.getcoupon.endDate=new Date($scope.getcoupon.endDate);
						$scope.errorMessage = "";
					},
					function(response){
						$scope.getcoupon=null;
						$scope.infoMessage = "";
						$scope.errorMessage = response.data.message;
					}
			  );
		  }
	  }
	  
	  $scope.updateCoupon=function(){
		  if(
				  isEmpty($scope.getcoupon.id)||
				  isEmpty($scope.getcoupon.endDate)||
				  isEmpty($scope.getcoupon.price)
		  ){emptyAlert();}else{
			  $http.put($scope.companyURL+"/updatecoupon/"+$scope.getcoupon.id+"/"+$scope.getcoupon.endDate+"/"+$scope.getcoupon.price).then(
			  function(response){
					$scope.infoMessage = response.data.message;
					$scope.errorMessage = "";
					$scope.getAllCompanyCoupons();
				},
				function(response){
					$scope.getcoupon=null;
					$scope.infoMessage = "";
					$scope.errorMessage = response.data.message;
				}
				);
		  }
	  }
	  
	  $scope.deleteCoupon=function(){
		  if(
				  isEmpty($scope.getcoupon.id)
		  ){emptyAlert();}else{
			  $http.delete($scope.companyURL+"/deletecoupon/"+$scope.getcoupon.id).then(
			  function(response){
					$scope.infoMessage = response.data.message;
					$scope.errorMessage = "";
					$scope.getAllCompanyCoupons();
				},
				function(response){
					$scope.getcoupon=null;
					$scope.infoMessage = "";
					$scope.errorMessage = response.data.message;
				}
				);
		  }
	  }
});