/**
 * Created by xzillion on 2017/1/11.
 * 配置requireJs
 */
require.config({
    //配置文件的路径
    paths: {
        'angular': 'libs/angular/angular',
        'uiRouter': 'libs/angular-ui-router/angular-ui-router',
        'jQuery': 'libs/jquery/jquery',
        "angularSpa": 'app',
        'myDirectives': 'directives/myDirectives',
        'myFilters': 'filters/myFilters',
        'homeCtrl': 'controllers/homeCtrl',
        'pageOneCtrl': 'controllers/one/pageOneCtrl',
        'pageTwoCtrl': 'controllers/two/pageTwoCtrl',
        'pageThreeCtrl': 'controllers/three/pageThreeCtrl',
        'pageFourCtrl': 'controllers/four/pageFourCtrl',
        'menuOneCtrl': 'controllers/four/menuOneCtrl',
        'menuTwoCtrl': 'controllers/four/menuTwoCtrl',
        'menuThreeCtrl': 'controllers/four/menuThreeCtrl',
        'menuFourCtrl': 'controllers/four/menuFourCtrl'

    },
    //配置不符合AMD规范的模块
    shim: {
        "angular": {
            deps: ['jQuery'],
            exports: "angular"
        },
        "uiRouter": {
            deps: ['angular'],
            exports: "uiRouter"
        },

    }
});
/**
 *加载模块
 */
require(
    [
        "angular",
        "uiRouter",
        "angularSpa",
        "jQuery",
        "myDirectives",
        "myFilters",
        "homeCtrl",
        "pageOneCtrl",
        "pageTwoCtrl",
        "pageThreeCtrl",
        "pageFourCtrl",
        'menuOneCtrl',
        'menuTwoCtrl',
        'menuThreeCtrl',
        'menuFourCtrl'
    ], function(angular) {
        angular.bootstrap(document, ["angularSpa"]); //加载完成回调：启动angular应用模块
    });