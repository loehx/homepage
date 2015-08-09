var $window = $(window);
var $html = $('html');
var windowHeight = $window.height();
var documentHeight = 0;

$(document).ready(function() {

    setTimeout(function() {
        $html.addClass('ready');
    }, 1)

    documentHeight = $(document).height();
    
    // DEBUGGING
    $('body').click(function() {
        $('html').toggleClass('ready');
    })
})

$window.one('scroll', function() {
    $html.addClass('scrolled');
})


/*
TODO: Finish Viewing plugin

$window.scroll(function() {
    var top = $window.scrollTop()
    var offsetStart = $window.scrollTop()
    var offsetEnd = offsetStart + windowHeight;
    var len = window._scrollEvents.length

    for (var i = 0; i < len; i++) {
        var event = window._scrollEvents[i]
        if (offsetEnd > event[0] && offsetStart < event[1]) {
            
            var marginTop = offsetStart - event[0];
            var marginBottom = offsetEnd - event[1];
            
            // TODO: Percentage value representing the offset of an element in the viewport.
            
            console.log('marginTop, marginBottom', marginTop, marginBottom);
            event[2](offsetStart)
        }
    }
})

window._scrollEvents = [];
$.fn.viewing = function(func) {
    $(this).each(function() {
        var startOffset = $(this).offset().top;
        var endOffset = startOffset + $(this).height();
        window._scrollEvents.push([startOffset, endOffset, func.bind(this)])
    })
}

$('.skyline').viewing(function(offset) {
    $(this).css('filter', 'brightness(' + offset + ')');
})*/