
/************Ajax*****************/
// var callback = {
//         success : function (data) {  //data Ajax成功的数据
//             // body...
//         },
//         fail : function () {  // Ajax成失败
//             // body...
//         }
//     }
//    myAjax(url, data, type, callback);

/*****************************/
//发送Ajax请求
function NBAjax(url, data, type,success,tag) {
    $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            data: data,
        })
        .done(function(d) {
           success(d,tag);
        })
        .fail(function() {
            
        })
        // .always(function() {
        //     console.log("complete");
        // });
}

var dalogModule = angular.module("DalogModule", []);

dalogModule.directive('dalog', function() {

    return {
        restrict: 'AE', //element
        replace: true, //替换掉自标签定义
        // templateUrl: '../tpls/dalog.html',
        template: '<div class="dalog"><p style="font-size: 25px;color: #fff;"></p></div>',

        link: function($rootScope, $scope) {

            texts = function(text) {

                    $('.dalog p').text(text);
                    setTimeout(alertV, 3000);


                    function alertV(event) {
                        $('.dalog').css('display', 'none');
                    }
                }
                // texts('此功能正在开发中');



        }


    }
});
dalogModule.factory('dalog', function() {
    return {
        texts: function(text) {

            $('.dalog p').text(text);
            $('.dalog').css('display', 'block');
            setTimeout(alertV, 2000);

            function alertV(event) {
                $('.dalog').css('display', 'none');

            }
        }
    };
});

/*
图片实时显示
*/

var fileInput = angular.module("fileInput", []);
fileInput.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event) {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                console.log(scope.file);
                scope.getFile();
            });
        }
    };
}]);
fileInput.controller('UploaderController', function($scope, fileReader) {
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.imageSrc = result;
            });
    };
});
fileInput.factory('fileReader', ["$q", "$log", function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.resolve(reader.result);
            });
        };
    };
    var onError = function(reader, deferred, scope) {
        return function() {
            scope.$apply(function() {
                deferred.reject(reader.result);
            });
        };
    };
    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };
    var readAsDataURL = function(file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);
        return deferred.promise;
    };
    return {
        readAsDataUrl: readAsDataURL
    };
}]);

/**
 * 
 * 
 *弹出层
 *
 */
var dalogModule = angular.module("DalogModule", []);

dalogModule.directive('dalog', function() {

    return {
        restrict: 'AE', //element
        replace: true, //替换掉自标签定义
        // templateUrl: '../tpls/dalog.html',
        template: '<div class="dalog"><p style="font-size: 25px;color: #fff;"></p></div>',

        link: function($rootScope, $scope) {

            texts = function(text) {

                    $('.dalog p').text(text);
                    setTimeout(alertV, 3000);


                    function alertV(event) {
                        $('.dalog').css('display', 'none');
                    }
                }
                // texts('此功能正在开发中');



        }


    }
});
dalogModule.factory('dalog', function() {
    return {
        texts: function(text) {

            $('.dalog p').text(text);
            $('.dalog').css('display', 'block');
            setTimeout(alertV, 2000);

            function alertV(event) {
                $('.dalog').css('display', 'none');

            }
        }
    };
});


var titleModule = angular.module("titleModule", []);
titleModule.factory('Title', function($rootScope, $state, $location) {
    return {
        pre: function(element, title, where) {
            // 最好别用bind函数 
            // $(element).bind('click', { title, where }, function(event) {
            //       console.log("element is click");
            //       $rootScope.title = title;
            //       console.log(title);
            //       console.log(where);
            //       $state.go(where);
            //  })  
            var objEvt = $._data(element[0], "events");
            if (objEvt && objEvt["click"]) {
                console.log("element is click");
                $rootScope.title = title;
                console.log(title);
                console.log(where);
                $state.go(where);
                console.log($location.url().substr(1, this.length));
                $rootScope.last_url =$location.url().substr(1, this.length);
            } else {
                $(element).click(function(event) {
                    console.log("element is click");
                    $rootScope.title = title;
                    console.log(title);
                    console.log(where);
                    $state.go(where);
                    console.log($location.url().substr(1, this.length));
                    $rootScope.last_url =$location.url().substr(1, this.length);
                });
            }

        },
        back: function(element) {
            // 最好别用bind函数
            // element.bind('click',function(event) {
            //     console.log("back is click");
            //     console.log(last_url);
            //     $state.go(last_url);
            // })
            $(element).click(function(event) {
                console.log("back is click");
                console.log($rootScope.last_url);
                $state.go($rootScope.last_url);
            });
        }

    }
});