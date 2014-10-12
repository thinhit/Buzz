angular.module('Buzz')
    .directive('niceScroll', [ function () {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                $(ele).niceScroll({
                    cursorcolor: "#cdcdcd",
                    boxzoom: false
                })
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
    }
    ])

    .directive('scrollToBottom', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                var win = angular.element($window);
                win.bind("resize", function (e) {
                    ele.scrollTop(ele[0].scrollHeight);
                });
            }
        }
    }]);