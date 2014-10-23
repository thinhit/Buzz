angular.module('Buzz')
    .directive('niceScroll', [ '$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                setTimeout(function () {
                    $(ele).mCustomScrollbar();

                }, 0)


            }
        }
    }])
    .directive('fixSize', [ function () {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                var size = (parseInt(attrs.size) || 0) + 90;
                $(window).resize(function () {
                    ele.height($('#wrapper').height() - size);
                });
                ele.height($('#wrapper').height() - size);
            }
        }
    }])

    .directive('scrollToBottom', ['$window', '$rootScope', function ($window, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                var win = angular.element($window);

                console.log('hello', ele[0].scrollHeight);

                ele.bind("resize", function (e) {
                    ele.scrollTop(ele[0].scrollHeight);
                    console.log('hello', ele[0].scrollHeight);
                });

                setTimeout(function (){
                    ele.mCustomScrollbar("scrollTo","bottom");
                    scope.$apply();
                }, 0);



            }
        }
    }])
    .directive('enterSubmit', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                elem.bind('keydown', function (event) {
                    var code = event.keyCode || event.which;

                    if (code === 13) {
                        if (!event.shiftKey) {
                            event.preventDefault();
                            elem.mCustomScrollbar("update");
                            setTimeout(function (){
                                elem.mCustomScrollbar("scrollTo","bottom");
                            }, 0);

                            console.log('hello');
                            scope.$apply(attrs.enterSubmit);
                        }
                    }
                });
            }
        }
    });