/**
 * Created by Administrator on 2017/3/25.
 */
define(['angularSpa'], function (app) {
    app.factory("uiHandler", function ($rootScope,$uibModal, apiHandler, dialogService, modalOptions,$interval,$state) {

        //定义会话失效次数,防止多次弹出会话失效框，一开始设置为0
        $rootScope.session_failure_times = 0;

        var fn = function () {
            var ui = {
                doAdd: function (what, successThenDo, failThenDo) {
                    ui.do(what, successThenDo, failThenDo);
                },
                doMod: function (what, successThenDo, failThenDo) {
                    ui.do(what, successThenDo, failThenDo);
                },
                doDel: function (what, successThenDo, failThenDo) {
                    ui.do(what, successThenDo, failThenDo);
                },
                doQry: function (what, successThenDo, failThenDo) {
                    ui.do(what, successThenDo, failThenDo);
                },
                do: function (what, successThenDo, failThenDo) {
                    apiHandler.execute(what.url, what.params, function (response) {
                        if (what.result != undefined) {
                            what.result.length = 0;
                        }
                        what.result = response.data;
                        if (successThenDo != undefined) {
                            successThenDo(response);
                        }
                        else if (what.successThenDo != undefined) {
                            what.successThenDo(response);
                        }
                    }, function (response) {

                        var oneParams = {
                            modalUrl: "views/template/showMessage.html",
                            modalTitle: "提示",
                            modalInfo: "",
                            button_left: "确定",
                            leftFunction :function(){

                            },
                        }
                        //会话失效，请重新登录
                        if((response.error_no =="21" || response.error_no =="20") && $rootScope.session_failure_times == 0){
                            $rootScope.session_failure_times = 1;
                            var _modalOptions = modalOptions;
                            _modalOptions.templateUrl="views/login.html";
                            _modalOptions.controller="loginCtrl";
                            _modalOptions.cancelCallback=function(){
                                var user_token = sessionStorage.getItem("user_token");
                                if(user_token!="" && user_token !=null){
                                    $state.reload();
                                }
                            }
                            hsDialogService.modalOpen(_modalOptions);
                            return;
                        }else if($rootScope.session_failure_times == 0){
                            if (failThenDo != undefined) {
                                failThenDo(response);
                            }
                            else if (what.failThenDo != undefined) {
                                what.failThenDo(response);
                            }
                            else if(what.failThenDo == undefined){
                                oneParams.modalInfo = $rootScope.Common.subErrorInfo(response.error_info);
                                ui.showMessage(oneParams);
                            }
                        }
                    });
                },
                //普通模态框
                showMessage: function (parmas) {
                    var _modalOptions = modalOptions;
                    _modalOptions.templateUrl = parmas.modalUrl || "views/template/showMessage.html";
                    _modalOptions.controller = function ($scope, $uibModalInstance) {
                        $scope.result = "";
                        $scope.modalTitle = parmas.modalTitle || "温馨提示";
                        $scope.modalInfo = parmas.modalInfo;
                        $scope.modalClass = parmas.modalClass;
                        $scope.modalParams = {
                            button_left: parmas.button_left ,
                            button_right: parmas.button_right
                        };
                        $scope.options = parmas.options; //传输到弹出框的数据
                        $scope.modalTimeOut = parmas.modalTimeOut || 0;  // 弹窗自动关闭时间（s）
                        //自定义传到控制器里面的参数
                        $scope.bll = parmas.bll;
                        //左边按钮函数
                        $scope.left = function () {
                            if (parmas.leftFunction != undefined) {
                                if(parmas.leftFunction() == "false"){//某些情况阻止弹窗关闭
                                    return false;
                                }
                            }
                            //定义弹框内的数据跟相关的js数据交互
                            if (parmas.backParmas != undefined) {
                                parmas.backParmas($scope.options);
                            }
                            $uibModalInstance.close();
                        }
                        //右边按钮函数
                        $scope.right = function () {
                            if (parmas.rightFunction != undefined) {
                                parmas.rightFunction();
                            }
                            $uibModalInstance.dismiss('close');
                        }
                        //关闭弹窗函数
                        $scope.close = function () {
                            if(parmas.closeFunction != undefined){
                                parmas.closeFunction();
                            }
                            $uibModalInstance.close();
                        }
                        // 计时自动关闭弹窗
                        $scope.closeAuto = function () {
                            if ($scope.modalTimeOut > 0) {
                                var timeOut = $scope.modalTimeOut;
                                var timer = $interval(function () {
                                    timeOut--;
                                    if (timeOut == 0) {
                                        $scope.close();
                                        $interval.cancel(timer);
                                    }
                                }, 1000);
                            }
                        }();

                        //ajax请求用
                        $scope.execute =function(value,api){
                            $scope.bll.varSet.is_button_click = true;
                            $scope.bll.varSet.error_info ="";
                            if(value == true){
                                ui.do(api);
                            }
                        }
                    }
                    _modalOptions.cancelCallback = parmas.cancelCallback || angular.noop;
                    dialogService.modalOpen(_modalOptions);
                },
            };
            return ui;
        }
        return fn;
    });
});