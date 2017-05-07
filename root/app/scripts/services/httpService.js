/**
 * Created by Administrator on 2017/3/25.
 */
define(['angularSpa'],function (app) {
    app.factory('httpService', function ($q, $http) {
        var errorMessage = "处理响应失败！";
        var httpService = {};
        httpService.getRequest = function (url, params) {
            var deffered = $q.defer();
            $http({
                method: 'GET',
                params: params,
                url: url,
            }).success(function (data) {
                deffered.resolve(data);
            }).error(function () {
                deffered.reject(errorMessage);
            });
            return deffered.promise;
        };
        httpService.postRequest = function (url, params) {
            var deffered = $q.defer();
            $http({
                method: 'POST',
                data: params,
                url: url,
            }).success(function (data) {
                deffered.resolve(data);
            }).error(function () {
                deffered.reject(errorMessage);
            });
            return deffered.promise;
        };
        return httpService;
    });
});