/**
 * Created by xzillion on 2017/1/12.
 */
define(['angularSpa'],function (app) {
    app.controller('menuFourCtrl',function ($scope, $state, $stateParams) {
        $scope.bll = {//作用域对象
            varSet: {//定义变量
                pageTest: ''
            },
            apiSet: {//定义接口

            },
            funcSet: {//定义函数
            }
        }
        $scope.init = function () {

        }
        $scope.init();
    })
});