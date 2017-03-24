/**
 * Created by xzillion on 2017/1/11.
 */
define(['angularSpa'],function (app) {
    app.controller('homeCtrl', function ($scope, $state, $stateParams) {
        $scope.bll = {//作用与对象
            varSet: {//定义变量

            },
            apiSet: {//定义接口
    
            },
            funcSet: {//定义函数
                toThree: function () {
                    $state.go('home.pageThree',{params: 'pageThree'})
                },
                toFour: function () {
                    $state.go('home.pageFour.menuOne',{params: 'pageFour'})
                }
            }
        }
    })
});