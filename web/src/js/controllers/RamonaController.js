tmj.controller('RamonaController', function($rootScope, $scope, $http, $sce, $compile, $routeParams) {

    $rootScope.pageName = 'ramona';

    var distanceTop = 0;
    $scope.swipeUp = function() {
        distanceTop = -$(window).height();
        $('.cards').each(function(i, e) {
            var top = parseInt($(this).css('top').replace('px'));
            if (i == 0 && top == (($('.cards').length - 1) * distanceTop)) {
                distanceTop = 0;
            }
            $(this).animate({ top: top + distanceTop }, 500, 'easeOutExpo');
        });
        setTimeout(function() {
            $rootScope.animateInitial();
        }, 1000);
        $rootScope.track('swipe', 'cards', 'up');
    }

});
