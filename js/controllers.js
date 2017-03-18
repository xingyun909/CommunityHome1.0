/**
 * 
 * 
 *后台主页模块
 *
 */
var manageModule = angular.module("ManageModule", []);
manageModule.controller('manageCtrl', function($scope, $http, $state, $stateParams, $rootScope) {
    $state.go('index.manage.notice');
    cssjx = function(i) {
        $(i).css({ "background-color": "#ffffff", "color": "#2b8de5" });
        $(i).siblings().css({ "background-color": "#2b8de5", "color": "#ffffff" });
    };
});

manageModule.controller('orderCtrl', function($scope, $http, $state, $stateParams, $rootScope) {
    //获取报修信息
    // $http.get("/appwuye/repair/getrepairs")

    // $http.get('/wuyeHome/data/repair.json')
    //             .success(function(largeLoad) {
    //                 var data = largeLoad;
    //                 console.log(data);
    //                 $scope.repairData = data; //绑定获取的数据到全局$scope上
    //             });
    $scope.repairData = [{
        "Title": "卧室的灯坏了，请速来修",
        "dateTime": "2016-03-06 03:00",
        "state": "等待处理",
        "address": "万达小区 #6栋 603室",
        "repairImg": "/images/baoxiu/light.jpg",
        "Content": "马桶开由于需要经常先开关闭，以往来会比马桶的使用寿命短很多，那么马桶盖坏了该怎么办？无需重新安装马桶，下面王师傅小编来该诉你如何下手更换马桶盖还有马桶盖的基础安装方法。马桶开由于需要经常先开关闭，以往来会比马桶的使用寿命短很多。"
    }, {
        "Title": "卧室的灯坏了，请速来修",
        "dateTime": "2016-07-06 03:00",
        "state": "已经完成",
        "address": "万达小区 #6栋 603室",
        "repairImg": "/images/baoxiu/light.jpg",
        "Content": "马asdkjkj急急急急搜客富婆数据哦福建省。"
    }, {
        "Title": "水龙头坏了",
        "dateTime": "2016-05-06 06:00",
        "state": "等待处理",
        "address": "厂家爱小区 #6栋 603室",
        "repairImg": "/images/baoxiu/light.jpg",
        "Content": "马asdkjkj急急急急搜客富婆数据哦福建省。"
    }];
    console.log($scope.repairData);
    $(".jinfinal").click(function() {
        $("#jindetails").hide();
    });
    $(".jinsu1").click(function() {
        $(this).addClass("jinsu1fin");
        $(this).removeClass("jinsu1");
    });
    // $("button").bind('click', function(event) {
    //     console.log($(this));
    //   $(this).siblings('.jinsu2').css("background-position", "-8px -62px");
    // });
    $scope.handle = function($index) {
        // if (confirm("确认报修任务完成")) {
        //     console.log($(this))
        //     console.log($scope.repairData[$index]);
        // $scope.repairData[$index].state = ""
        // $(this:has(span)).css("background-position", "-8px -62px");
        // $('.jinsu2').css("background-position", "-8px -62px");
        // $http.post(url，{repairId：$index})
        //     .success(function(data) {
        //        if (data.type == "failure") {
        //             if (data.reason == "repairid not exist") {
        //                 console.log("repairid not exist");
        //             }else if(data.resaon == "repairid wrong"){
        //                 console.log("repairid wrong");
        //             }else if(data.resaon == "need accept"){
        //                 console.log("need accept");
        //             }
        //        }else if (data.type == "success") {

        //             console.log("报修任务完成");
        //        }
        //     });
        // } else {
        //     return false;
        // }

    }
    $scope.showDetail = function($index) {
        console.log($rootScope.detail);
        $rootScope.detail = $scope.repairData[$index];
        $("#jindetails").show();
    }


});

//物业公告控制器
manageModule.controller('noticeCtrl', function($scope, $http, $state, $stateParams, $rootScope, dalog) {
    //jx
    $scope.contentj = 0;
    $scope.mystyle = [];

    var callback = function(data) { //data Ajax成功的数据
        $rootScope.announceitem = data;
        for (var i in $rootScope.announceitem) {
            $rootScope.announceitem[i].check = true;
        }

        $scope.$apply();
    };
    NBAjax("/apiwuye/announce/getannounces", "", "get", callback);
    //表头checkbox点击效果
    $rootScope.check = true;
    $scope.changeall = function() {
        $rootScope.check = !$rootScope.check;
        for (var i = 0; i < $rootScope.announceitem.length; i++) {
            if ($rootScope.check == true)
                $rootScope.announceitem[i].check = true;
            else
                $rootScope.announceitem[i].check = false;
        }
    };
    //表中子checkbox点击效果
    $scope.zichange = function(index) {
        $rootScope.announceitem[index].check = !$rootScope.announceitem[index].check;
        var sum = 0;
        for (var i = 0; i < $rootScope.announceitem.length; i++) {
            if ($rootScope.announceitem[i].check == true)
                $rootScope.check = true;
            if ($rootScope.announceitem[i].check == false)
                sum++;
        }
        if (sum == $rootScope.announceitem.length)
            $rootScope.check = false;
    };
    //“删除”点击效果
    $scope.del = function() {
        if (confirm('是否删除已选公告？')) {
            var isselect = 0; //计数器
            for (var i = $rootScope.announceitem.length - 1; i > -1; i--) {
                //如果第i被选
                if ($rootScope.announceitem[i].check == false) {
                    //删除数据
                    var callback = function(data, tag) {
                        if (data.type == "success") {
                            for (var i in $rootScope.announceitem) {
                                if (tag == $rootScope.announceitem[i].id) {
                                    $rootScope.announceitem.splice(i, 1);
                                    $scope.$apply();
                                    break;
                                } //data Ajax成功的数据]
                            }
                        } else {
                            alert("数据未删除！");
                        }
                    };

                    NBAjax("/apiwuye/announce/Delete", "announceId=" + $rootScope.announceitem[i].id, "post", callback, $rootScope.announceitem[i].id);
                    isselect++;
                };
            }
            if (isselect != 0)
                alert('删除成功');
            else {
                alert('未选中公告！');
                $scope.change = 0;
            }
        } else {
            $scope.change = 0;
        }
    };
    //“垃圾箱”点击效果
    $scope.del2 = function(index) {
        if (confirm('是否删除已选公告？')) {
            //删除数据
            var callback = function(data, tag) {
                if (data.type == "success") {
                    if (tag == $rootScope.announceitem[index].id)
                        $rootScope.announceitem.splice(index, 1);
                    $scope.$apply();
                }
            }
            NBAjax("/apiwuye/announce/Delete", "announceId=" + $rootScope.announceitem[index].id, "post", callback, $rootScope.announceitem[index].id);
            alert('删除成功');
        }
    };

    //“增加”点击效果
    $scope.main2 = true;
    $scope.add = function() {
        $scope.main2 = !$scope.main2;
    };
    //"增加"存于数据
    // $scope.addsub = function() {
    //     if (confirm('是否确认添加公告？')) {
    //         // var callback = function(data) {
    //         //     if (data.type == "success") {
    //         //         //判断是否上传成功
    //         //         alert("添加成功！");

    //         //         $state.go('index.manage.order', {}, { reload: true });
    //         //     }
    //         // }
    //         // NBAjax("/apiwuye/announce/add", { 'title': $scope.adtitlej, 'content': $scope.adcontentj, 'img': $scope.adimgj }, "post", callback);

    //     }
    // };

    $("#formid").submit(function() {
        if (confirm('是否确认添加公告？')) {
            dalog.texts("正在提交，请等待");
            $("#formid").ajaxSubmit({
                type: "post", //提交方式  
                dataType: "json", //数据类型  
                url: "/apiwuye/announce/add", //请求url  
                success: function(data) { //提交成功的回调函数  
                    console.log(data);
                    if (data.type == "success") {
                        // dalog.texts("发布成功");
                        alert("发布成功");
                        $state.go('index.manage.order', {}, { reload: true });
                        clearForm(formid);
                    } else if (data.type == "failure") {

                        // if (data.reason == "title or content not exist") {
                        //     dalog.texts("提交失败，请正确填写报修信息");
                        // }
                    }
                }
            });
            return false; //不刷新页面  
        }
    });

    //清空表单
    function clearForm(form) {
        $(':input', form).each(function() {
            var type = this.type;
            var tag = this.tagName.toLowerCase(); // normalize case
            if (type == 'text' || type == 'password' || tag == 'textarea')
                this.value = "";
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            else if (tag == 'select')
                this.selectedIndex = -1;
            else if (type == 'file')
                $('img', form).attr("src", "images/addpic.jpg");
        });
    };
    //"修改"点击效果
    $scope.main3 = true;
    $scope.revise = function(index) {
        $scope.main3 = !$scope.main3;
        if (index != -1) {
            $scope.numjx = index;
        }
        //显示"修改"内部数据
        $scope.rtitlejx = $rootScope.announceitem[$scope.numjx].title;
        $scope.rcontentjx = $rootScope.announceitem[$scope.numjx].content;
        $scope.rimgjx = $rootScope.announceitem[$scope.numjx].img;
    };
    //修改内容存数据
    $scope.revisesub = function(num) {
        if (confirm('是否确认修改此公告？')) {
            var titlej = $scope.rtitlejx;
            var contentj = $scope.rcontentjx;
            var imgj = $scope.rimgjx;
            $rootScope.announceitem[num].title = titlej;
            $rootScope.announceitem[num].content = contentj;
            $rootScope.announceitem[num].img = imgj;
            //判断是否上传成功
            var a = 1;
            if (a == 1)
                alert("修改成功！");
        }
    };

    $scope.$apply();

});
/*******登陆************/
var loginModule = angular.module("loginModule", []);
loginModule.controller('loginFormCtrl', function($scope, $http, $state, $stateParams, dalog) {
    function getData() {
        var phone = $('#phone').val(),
            pwd = $('#pwd').val(),
            msgcode = $('#msgcode').val(),
            user = {};
        user.phone = phone;
        user.pwd = pwd;
        user.msgcode = msgcode;
        return user;
    }

    function checkUser(account, pass) {
        function checkPhone(account, pass) {
            var accountCheck = /(^1[3|5][0-9]\d{4,8}$)|(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/;
            var state = "";
            if (account === "") {
                dalog.texts('请输入正确账号');
                return state = "fail";
            } else if (!accountCheck.test(account)) {
                dalog.texts('不是正确的手机号');
                return state = "fail";
            }
            console.log(pass.length);
            if (pass != null) {
                if (pass.length < 6) {
                    dalog.texts('密码应大于六位');
                    return state = "fail";
                } else if (pass.length > 20) {
                    dalog.texts('密码应小于20位');
                    return state = "fail";
                }
            }
        }
        return checkPhone(account, pass);
    }
    $('.login').click(function(event) {
        var data = getData();
        console.log(data);
        var account = data.phone;
        var pass = data.pwd;
        var callback = {
            success: function(data) { //data Ajax成功的数据
                console.log(data);
                if (data.type == 'success') {
                    console.log("登录成功");
                    dalog.texts('登录成功');
                    $state.go("index");
                }
                if (data.type == "failure") {
                    console.log("登录失败，重新登录");
                    dalog.texts('登录失败，重新登录');
                    if (data.reason == "pwd wrong") {
                        dalog.texts('密码错误，请重新登录');
                    } else if (data.reason == "phone not exist") {
                        dalog.texts('手机不存在，请重新登录');
                    }
                }
            },
            fail: function() { // Ajax成失败
                console.log("请求失败");
                dalog.texts('请求失败');
            }
        };
        console.log(checkUser(account, pass));
        if (checkUser(account, pass) != "fail") {
            myAjax('/api/account/login', data, 'POST', callback);
        }
    });
});
