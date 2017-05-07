/**
 * 接口处理服务
 * Created by Administrator on 2017/3/25.
 */
define(['angularSpa'], function (app) {
    app.factory('apiHandler', ['httpService', function (httpService) {
        var apiHandler = {};
        apiHandler.execute = function (url, params, successCallback, failCallback, disconnCallback) {
            httpService.postRequest(url, angular.extend(params))
                .then(function (data) {
                    if (!data.error_no) {
                        if (angular.isFunction(successCallback) && successCallback.length >= 1) {
                            successCallback(data);
                            return;
                        }
                        alert("操作成功！");
                    } else {
                        if (angular.isFunction(failCallback) && failCallback.length >= 1) {
                            failCallback(data);
                            return;
                        }
                        alert(data.error_info);
                    }
                }, function (errorMessage) {
                    if (angular.isFunction(disconnCallback) && disconnCallback.length >= 1) {
                        disconnCallback(errorMessage);
                        return;
                    }
                    alert(errorMessage);
                });
        }
        return apiHandler;
    }]);
});