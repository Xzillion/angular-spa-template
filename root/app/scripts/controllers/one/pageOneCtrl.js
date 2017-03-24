/**
 * Created by xzillion on 2017/1/11.
 */
define(['angularSpa'], function (app) {
    app.controller('pageOneCtrl', function ($scope, $state, $stateParams) {
        $scope.bll = {//作用域对象
            varSet: {//定义变量
                pageTest: ''
            },
            apiSet: {//定义接口

            },
            funcSet: {//定义函数

            },
        }
        $scope.init = function () {
            $scope.bll.varSet.pageTest = 'I am ' + $stateParams.params;
        }
        $scope.init();
    })
});