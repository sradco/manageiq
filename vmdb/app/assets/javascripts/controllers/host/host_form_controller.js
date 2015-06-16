miqAngularApplication.controller('hostFormController', ['$http', '$scope', 'hostFormId', 'miqService', function($http, $scope, hostFormId, miqService) {
  var init = function() {
    $scope.hostModel = {
      name: '',
      ipaddress: '',
      hostname: '',
      ipmi_address: '',
      custom_1: '',
      user_assigned_os: '',
      mac_address: '',
      default_userid: '',
      default_password: '',
      default_verify: '',
      remote_userid: '',
      remote_password: '',
      remote_verify: '',
      ws_userid: '',
      ws_password: '',
      ws_verify: '',
      ipmi_userid: '',
      ipmi_password: '',
      ipmi_verify: '',
      log_userid: '',
      log_password: '',
      log_verify: ''

    };

    $scope.modelCopy = angular.copy( $scope.hostModel );
    $scope.afterGet = false;
    $scope.formId = hostFormId;
    miqAngularApplication.$scope = $scope;

    if (hostFormId == 'new') {
      $scope.hostModel.name = "";
      $scope.hostModel.ipaddress = "";
      $scope.hostModel.hostname = "";
      $scope.hostModel.ipmi_address = "";
      $scope.hostModel.custom_1 = "";
      $scope.hostModel.user_assigned_os = "";
      $scope.hostModel.mac_address = "";
      $scope.hostModel.default_userid = "";
      $scope.hostModel.default_password = "";
      $scope.hostModel.default_verify = "";
      $scope.hostModel.remote_userid = "";
      $scope.hostModel.remote_password = "";
      $scope.hostModel.remote_verify = "";
      $scope.hostModel.ws_userid = "";
      $scope.hostModel.ws_password = "";
      $scope.hostModel.ws_verify = "";
      $scope.hostModel.ipmi_userid = "";
      $scope.hostModel.ipmi_password = "";
      $scope.hostModel.ipmi_verify = "";
      $scope.hostModel.log_userid = "";
      $scope.hostModel.log_password = "";
      $scope.hostModel.log_verify = "";

      $scope.afterGet = true;

    } else {
        miqService.sparkleOn();

        $http.get('/host/host_form_fields/' + hostFormId).success(function(data) {
          $scope.hostModel.name = data.name;
          $scope.hostModel.ipaddress = data.ipaddress;
          $scope.hostModel.hostname = data.hostname;
          $scope.hostModel.ipmi_address = data.ipmi_address;
          $scope.hostModel.custom_1 = data.custom_1;
          $scope.hostModel.user_assigned_os = data.user_assigned_os;
          $scope.hostModel.mac_address = data.mac_address;
          $scope.hostModel.default_userid = data.default_userid;
          $scope.hostModel.default_password = data.default_password;
          $scope.hostModel.default_verify = data.default_verify;
          $scope.hostModel.remote_userid = data.remote_userid;
          $scope.hostModel.remote_password = data.remote_password;
          $scope.hostModel.remote_verify = data.remote_verify;
          $scope.hostModel.ws_userid = data.ws_userid;
          $scope.hostModel.ws_password = data.ws_password;
          $scope.hostModel.ws_verify = data.ws_verify;
          $scope.hostModel.ipmi_userid = data.ipmi_userid;
          $scope.hostModel.ipmi_password = data.ipmi_password;
          $scope.hostModel.ipmi_verify = data.ipmi_verify;

          $scope.hostModel.log_userid = data.default_userid;
          $scope.hostModel.log_password = data.default_password;
          $scope.hostModel.log_verify = data.default_verify;

          $scope.afterGet = true;

          $scope.modelCopy = angular.copy( $scope.hostModel );
          miqService.sparkleOff();
        });
     }

     $scope.currentTab = "Default";



    $scope.$watch("hostModel.name", function() {
      $scope.form = $scope.angularForm;
      $scope.miqService = miqService;
    });
  };

  $scope.assignDefaultUser = function() {
   if($scope.currentTab == "Remote") {
     $scope.hostModel.remote_userid = $scope.hostModel.log_userid;
     $scope.hostModel.remote_password = $scope.hostModel.log_password;
     $scope.hostModel.remote_verify = $scope.hostModel.log_verify;
     $scope.currentTab = "Default";
   }
    $scope.angularForm.log_verify.$setPristine(true);
    $scope.hostModel.log_userid = $scope.hostModel.default_userid;
    $scope.hostModel.log_password = $scope.hostModel.default_password;
    $scope.hostModel.log_verify = $scope.hostModel.default_verify;
  }

  $scope.assignRemoteUser = function() {
    if($scope.currentTab == "Default") {
      $scope.hostModel.default_userid = $scope.hostModel.log_userid;
      $scope.hostModel.default_password = $scope.hostModel.log_password;
      $scope.hostModel.default_verify = $scope.hostModel.log_verify;
      $scope.currentTab = "Remote";
    }

    $scope.angularForm.log_verify.$setPristine(true);
    $scope.hostModel.log_userid = $scope.hostModel.remote_userid;
    $scope.hostModel.log_password = $scope.hostModel.remote_password;
    $scope.hostModel.log_verify = $scope.hostModel.remote_verify;
  }

  $scope.addClicked = function() {
    miqService.sparkleOn();
    var url = 'create/new' + '?button=add';
    miqService.miqAjaxButton(url, true);
  };

  $scope.cancelClicked = function() {
    miqService.sparkleOn();
    if (hostFormId == 'new') {
      var url = '/host/create/new' + '?button=cancel';
    }
    else {
      var url = '/host/update/' + hostFormId + '?button=cancel';
    }
    miqService.miqAjaxButton(url);
  };

  $scope.saveClicked = function() {
    miqService.sparkleOn();
    var url = '/host/update/' + hostFormId + '?button=save';
    miqService.miqAjaxButton(url, true);
  };

  $scope.resetClicked = function() {
    $scope.hostModel = angular.copy( $scope.modelCopy );
    $scope.angularForm.$setPristine(true);
    setFormToValid();
    miqService.miqFlash("warn", "All changes have been reset");
  };

  var setFormToValid = function() {
    for (var name in $scope.angularForm) {
      if($scope.angularForm[name].$name == name)
        $scope.angularForm[name].$setValidity('miqrequired', true);
      }
    }

  $scope.isBasicInfoValid = function() {
    if($scope.angularForm.log_userid.$valid &&
       $scope.angularForm.log_password.$valid &&
       $scope.angularForm.log_verify.$valid)
      return true;
    else
      return false;
  };

  init();
}]);
