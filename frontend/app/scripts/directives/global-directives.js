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

    .directive('scrollToBottom', ['$window', '$rootScope', function ($window, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, ele, attrs) {
                var win = angular.element($window);
                scope.scroll = function (){
                    return ele[0].scrollHeight;
                };

                scope.$watch('scroll', function (){
                    $('.wrap').scrollTop(1000000);
                    console.log('Scroll change');
                });



                ele.bind("resize", function (e) {
                    $('.wrap').scrollTop(1000000);

                });

                setTimeout(function () {
                    $('.wrap').scrollTop(1000000);
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
                            /*elem.mCustomScrollbar("update");
                             setTimeout(function (){
                             elem.mCustomScrollbar("scrollTo","bottom");
                             }, 0);*/

                            console.log('hello');
                            scope.$apply(attrs.enterSubmit);
                        }
                    }
                });
            }
        }
    })
    .filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

