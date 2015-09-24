var $window = $(window);
var $html = $('html');
var windowHeight = $window.height();
var documentHeight = 0;


var initialize = function(description, func) {
    setTimeout(function() {
        try {
            func();
            console.log('Initialize ' + description);
        }
        catch (err) {
            console.error('Initialization failed for: ' + description, err);
        }
    }, 0);
}



$(document).ready(function() {

    setTimeout(function() {
        $html.addClass('ready');


        initialize("Feature #1: Sticky navbar", function() {
            var header = $('.site-header header');
            header.affix({
                offset: {
                    top: header.offset().top
                }
            })
        })


        initialize("Feature #2: Dynamic navigation build up", function() {
            var anchors = $('a[name]').map(function() {
                return '<li><a href="#' + $(this).attr('name') + '">' + $(this).attr('title') + '</a></li>';
            }).toArray();
            $('#navigation .nav').html(anchors.join(''));
        })


        initialize("Feature #3: Scroll spy on navigation", function() {
            $('body').scrollspy({
                target: '#navigation',
                offset: $window.height() * 0.5
            });

            $('#navigation .nav li').on('activate.bs.scrollspy', function() {
                // Find target section and give it the class: active
                var target = $($(this).find('a').attr('href'));
                target.addClass('active');
                target.prevAll().addClass('active');
                target.nextAll().removeClass('active');
            });
        });


        if (!!window.chrome) {
            initialize("Feature #4: Smooth scroll for Google Chrome", function() {
                $.getScript('/javascripts/smooth-scroll.js')
            });
        }


        initialize("Feature #5: Background parallax effect", function() {
            var header = $('.site-header');
            var headerBottom = header.height();
            var background = header.find('.background');

            function doParralax() {
                var scrollTop = $window.scrollTop();
                if (scrollTop < headerBottom) {
                    background.css('transform', 'translate3d(0,' + Math.ceil(scrollTop * 0.5) + 'px,0)')
                }
            }

            $window.scroll(doParralax);
            doParralax();
        })


        initialize("Feature #6: Page loading progress", function() {
            var images = $('img');
            var totalCount = images.length;
            var current = 0;
            var progressBar = $('#site-progress > div').css('opacity', '1');

            // Wait for images to load
            images.one('load', function() {
                current++;
                // Update progress bar
                progressBar.css('width', (current / totalCount * 100) + '%')
                if (current == totalCount) {
                    // Set images-loaded classin html-tag
                    $html.addClass('images-loaded');
                    progressBar.css('opacity', '0');
                }
            }).each(function() {
                if (this.complete)
                    $(this).load();
            });

            // Set images-loaded automatically after 3 seconds
            setTimeout(function() {
                if (current == totalCount) return;
                $html.addClass('images-loaded');
                progressBar.css('opacity', '0');
            }, 3000);
        })
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