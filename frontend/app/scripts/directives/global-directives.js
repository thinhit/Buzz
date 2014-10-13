angular.module('Buzz')
    .directive('niceScroll', [ '$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                setTimeout(function () {
                    $(ele).niceScroll({
                        cursorcolor: "#cdcdcd",
                        boxzoom: false
                    })
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
                            scope.$apply(attrs.enterSubmit);
                        }
                    }
                });
            }
        }
    });