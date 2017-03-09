angular.module('cobra-manager')


.service('UrlService', function () {
  var data = {
    baseurl: './api/',
    login: 'auth/login',
    register: 'auth/register',
    profile_update: 'auth/update',
    profile_info: 'auth/info',
    users_info: 'auth/usersinfo',
    ledger_add: 'ledger/add',
    ledger_total: 'ledger/get_total',
    ledger_log: 'ledger/get_log',
  };

  this.get = function (id, single) {
    if (id) {
      return data.baseurl + data[id];
    } else {
      return data.baseurl;
    }
  }
});
