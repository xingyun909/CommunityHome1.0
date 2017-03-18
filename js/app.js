var routerApp = angular.module('routerApp', ['ui.router', 'ngGrid', 'ManageModule','loginModule','DalogModule','fileInput']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
routerApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'main@index': {
                    templateUrl: 'tpls/loginForm.html'
                }
            }
        })
        .state('index.manage', {
            url: '/manage',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                },
                'topbar@index': {
                    templateUrl: 'tpls/topbar.html'
                },
                'main@index': {
                    templateUrl: 'tpls/manage.html'
                }
            }
        })
        .state('index.manage.order', {  //报修订单
            url: '/order',
            templateUrl: 'tpls/order.html',
            controller: 'orderCtrl'
        })
        .state('index.manage.notice', {     //社区公告
            url: '/notice',
            templateUrl: 'tpls/notice.html',
            controller: 'noticeCtrl'
        })
        .state('index.manage.account', {       // 账号管理
            url: '/account',
            templateUrl: 'tpls/account.html'
        })
        .state('index.manage.dianshang_audit', {        //电商申请审核
            url: '/dianshang_audit',
            templateUrl: 'tpls/dianshang_audit.html'
        })
        .state('index.manage.yezhu_audit', {        //业主审核
            url: '/yezhu_audit',
            templateUrl: 'tpls/yezhu_audit.html'
        })
        .state('loginForm', {        //登陆
            url: '/loginForm',
            templateUrl: 'tpls/loginForm.html',
            controller: 'loginFormCtrl'
        })


});
