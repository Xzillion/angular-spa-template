/**
 * 弹窗服务
 * Created by Administrator on 2017/3/25.
 */
define(['angularSpa'], function (app) {
    app.factory('dialogService', function ($q, $injector) {
        var dialogService = {};
        /**
         * 设置传输的参数
         * @param options
         * @returns {{modalTitle: dialogService.modalTitle, modalInfo: dialogService.modalInfo, modalParams: dialogService.modalParams, modalClass: dialogService.modalClass}}
         */
        var setResulve = function (options) {

            return {
                modalTitle: function () {   //错误标题
                    return options.modalTitle || '警告';
                },
                modalInfo: function () {    //错误信息
                    return options.modalInfo || '操作失败';
                },
                modalParams: function () {    //错误类别
                    return options.modalParams || '';
                },
                modalClass: function () {    //图标样式
                    return options.modalClass || '';
                },
            }
        };
        /**
         * 打开弹窗
         * @param options
         */
        dialogService.modalOpen = function (options) {
            var resolve = setResulve(options);
            var $uibModal = $injector.get('$uibModal');
            var $uibModalStack = $injector.get('$uibModalStack');
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: options.templateUrl || "views/template/showMessage.html",
                controller: options.controller,
                size: "sm",
                resolve: resolve
            });
            modalInstance.result.then(function () {
                options.cancelCallback();
            }, function () {
                options.cancelCallback();
            });
        }
        return dialogService;
    }).value("modalOptions", {
        modalTitle: "",//模态框的标题
        modalInfo: "",//模态框的显示的信息
        modalParams: {},//模态框传递的参数
        modalClass: "",//传递的样式
        templateUrl: "",//传递的Url
        controller: "",//传递的controller
        cancelCallback: angular.noop,//失败回调函数
        confirmCallback: angular.noop//成功回调函数
    })
});