var organizeCards = function(newValue, oldValue) {
    if (newValue.w > 480) {
        $('.cards').css({
            "width": "80%",
            "max-width": "1180px",
            "margin": "0 auto",
            "padding": 0
        });
        $('.cards').find('.card').each(function() {
            $(this).attr('style', '');
            $(this).attr('class', $(this).attr('data-class'));
            $(this).find('.img').css('height', 'auto');
            $(this).find('.img').removeClass('no-padding');
            $(this).find('.img').css('padding', $(this).attr('data-padding'));
        });
        if ($('.cards').masonry()) {
            $('.cards').masonry('destroy');
        }
        $('.cards').masonry({
            itemSelector: '.card',
            columnWidth: '.one-five',
            percentPosition: false,
            gutter: 20
        });
    } else {
        if ($('.cards').masonry()) {
            $('.cards').masonry('destroy');
        }

        $('.cards').each(function() {
            var card = $(this).find('.card');
            card.width(newValue.w - 80);
            card.eq(0).css({
                "margin-left": 40
            });
            card.each(function(i, c) {
                if ($(c).hasClass('featured')) {
                    $(c).attr('class', 'card featured ng-scope');
                    $(c).css({"height": h});
                } else {
                    $(c).attr('class', 'card ng-scope');
                }
            })

            var h = newValue.h - 280;
            card.find('.img').css({"height": h});
            card.find('.img').addClass('no-padding');
            var e = card.width() + 20
            var w = (e * card.length) + 70;
            $(this).css({
                "width": w,
                "max-width": w,
                "margin": 0,
                "padding": 0
            });
        });
    }
}

tmj.directive('resize', function($window) {
    return function(scope, element, attr) {
        var w = angular.element($window);
        scope.$watch(function() {
            return {
                'h': w.height(),
                'w': w.width()
            };
        }, organizeCards, true);
        w.bind('resize', function() {
            scope.$apply();
        });
    }
});

tmj.directive('organizeCards', function() {
    return function(scope, element, attrs) {
        if (scope.$last) {
            setTimeout(function() {
                var w = $(window);
                organizeCards({
                    'h': w.height(),
                    'w': w.width()
                }, {
                    'h': w.height(),
                    'w': w.width()
                })
            }, 1);
        }
    };
})

tmj.directive("cardClass", function() {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            ngClasses: "="
        },
        link: function(scope, elem, attr) {
            var card = scope.ngClasses;
            if (card.kind == 'image') {
                var ratio = parseFloat(card.image.ratio.replace(',', '.'));
                if (ratio <= 1) {
                    var percent = 50 * (1 + (1 - ratio));
                    $(elem).parent().addClass('card one-five column');
                    $(elem).parent().attr('data-class', 'card one-five column');
                    $(elem).css({ "padding": percent + "% 0" });
                    $(elem).attr('data-padding', percent + "% 0");
                } else {
                    var percent = 50 * (card.image.height / card.image.width);
                    $(elem).css({ "padding": percent + "% 0" });
                    $(elem).attr('data-padding', percent + "% 0");
                    if (percent > 16) {
                        $(elem).parent().addClass('card two-five column');
                        $(elem).parent().attr('data-class', 'card two-five column');
                    } else if (percent > 33) {
                        $(elem).parent().addClass('card three-five column');
                        $(elem).parent().attr('data-class', 'card three-five column');
                    } else {
                        $(elem).parent().addClass('card one-five column');
                        $(elem).parent().attr('data-class', 'card one-five column');
                    }
                }
            } else if (card.kind == 'text') {
                $(elem).parent().addClass('card one-five column text');
                $(elem).parent().attr('data-class', 'card one-five column text');
                $(elem).remove();
            } else if (card.kind == 'featured') {
                $(elem).parent().addClass('card '+card.size+'-five column featured');
                $(elem).parent().attr('data-class', 'card '+card.size+'-five column featured');
            }
        }
    }
});
