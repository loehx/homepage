var $window = $(window);
var $html = $('html');
var windowHeight = $window.height();
var documentHeight = 0;

$(document).ready(function() {

    setTimeout(function() {
        $html.addClass('ready');

        // Feature #1: Sticky navbar
        var header = $('.site-header header');
        header.affix({
            offset: {
                top: header.offset().top
            }
        })

        // Feature #2: Dynamic navigation build up
        var anchors = $('a[name]').map(function() {
            return '<li><a href="#' + $(this).attr('name') + '">' + $(this).attr('title') + '</a></li>';
        }).toArray();
        $('#navigation .nav').html(anchors.join(''));
        
        // Feature #3: Scroll spy on navigation
        $('body').scrollspy({
            target: '#navigation'
        });
    }, 1)

    documentHeight = $(document).height();
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