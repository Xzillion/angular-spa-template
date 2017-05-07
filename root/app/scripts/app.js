/**
 * Created by xzillion on 2017/1/11.
 * 用于配置angularJs
 */
define(
    [
        "angular",
        "uiRouter",
        "angularSanitize",
    ],
    function (angular) {
        //angular.module(name, [requires], [configFn]); name：字符串类型，代表模块的名称；requires：字符串的数组，代表该模块依赖的其他模块列表，如果不依赖其他用空数组，
        //configFn：用来对该模块进行一些配置对模块中的组件进行实例化对象实例之前的特定配置
        return angular.module("angularSpa",
            [
                "ui.router",
                "ui.bootstrap",
                "ngSanitize",
            ],
            ["$httpProvider",httpConfig])
            .config(['$stateProvider', '$urlRouterProvider', routeConfig])
    });
/**
 * http访问配置类
 * @param httpProvider
 */
function httpConfig(httpProvider){
    // 头部配置
    httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

    /**
     * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

}
/**
 * 路由配置
 * @param $stateProvider
 * @param $urlRouterProvider
 */
function routeConfig($stateProvider, $urlRouterProvider) {
    /**
     * 配置路由
     */
    $urlRouterProvider.otherwise('home/pageOne/pageOne');//路径没有配置路由的时候默认跳转到指定路径
    $stateProvider
        .state('home',{
            url: '/home',
            abstract: true,
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
        })
        .state('home.pageOne',{
            url: '/pageOne/:params',
            templateUrl: 'views/one/pageOne.html',
            controller: 'pageOneCtrl'
        })
        .state('home.pageTwo',{
            url: '/pageTwo/:params',
            templateUrl: 'views/two/pageTwo.html',
            controller: 'pageTwoCtrl'
        })
        .state('home.pageThree',{
            url: '/pageThree/:params',
            templateUrl: 'views/three/pageThree.html',
            controller: 'pageThreeCtrl'
        })
        .state('home.pageFour',{
            url: '/pageFour/:params',
            abstract: true,
            templateUrl: 'views/four/pageFour.html',
            controller: 'pageFourCtrl'
        })
        .state('home.pageFour.menuOne',{
            url: '/menuOne',
            templateUrl: 'views/four/menuOne.html',
            controller: 'menuOneCtrl'
        })
        .state('home.pageFour.menuTwo',{
            url: '/menuTwo',
            templateUrl: 'views/four/menuTwo.html',
            controller: 'menuTwoCtrl'
        })
        .state('home.pageFour.menuThree',{
            url: '/menuThree',
            templateUrl: 'views/four/menuThree.html',
            controller: 'menuThreeCtrl'
        })
        .state('home.pageFour.menuFour',{
            url: '/menuFour',
            templateUrl: 'views/four/menuFour.html',
            controller: 'menuFourCtrl'
        })

}