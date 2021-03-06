var $window = $(window);
var $html = $('html');
var windowHeight = $window.height();
var documentHeight = 0;


/**
 * Initializes a module
 *
 * options
 *  watchBrowserResize: reinitializes the module after the user resized the browser.
 */
var initialize = function(description, func, options) {
	if (!options) options = {};

	__init(description, func, options);

	// On browser resize ...
	if (options.watchFrom || options.watchTo) {
		$window.on('resized', function() {
			options.resized = true;
			__init(description, func, options);
		});
	}
}

function __init(description, func, options) {
	try {
		var run = true;
		var ww = $window.width();
		if (options.watchFrom) run = ww >= options.watchFrom;
		if (run && options.watchTo) run = ww <= options.watchTo;
		if (!run) return;

		var label = 'RUN: ';
		if (options.resized) label = 'RUN AGAIN: (window resized to ' + ww + 'px) ';

		console.log(label + description);
		var message = func(options);
		if (message)
			console.log(' > "' + message + '"');

	} catch (err) {
		console.error('Initialization failed for: ' + description, err);
	}
}



$(document).ready(function() {

	setTimeout(function() {
		$html.addClass('ready');


		initialize("Introduce 'resized' event", function() {
			$window.resize(debounce(function() {
				$window.trigger('resized');
			}, 200));
		})


		initialize("Check wether the viewport is portrait or landscape", function() {
			var landscape = $window.width() > $window.height();
			$html
				.toggleClass('landscape', landscape)
				.toggleClass('portrait', !landscape);
		}, {
			watchFrom: 1
		})


		initialize("Feature #1: Sticky navbar", function() {
			var header = $('.site-header header');
			header.affix({
				offset: {
					top: header.offset().top
				}
			})
		}, {
			watchFrom: 601
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
			var background = header.find('.background, header');
			var headerBottom = header.outerHeight();
			var pixels = ($('.container').width() - header.find('.logo').width()) / 2;
			var done = false;

			function doParralax() {
				var scrollTop = $window.scrollTop();
				if (scrollTop < headerBottom) {
					var progress = Math.min(1, scrollTop / headerBottom);
					background.css('transform', 'translate3d(-' + Math.ceil(progress * pixels) + 'px,0,0)')
					if (done) $html.toggleClass('scrolled-header', done = false);
				} else if (!done) {
					$html.toggleClass('scrolled-header', done = true);
					background.css('transform', 'translate3d(-' + pixels + 'px,0,0)')
				}
			}

			$window.on('scroll.bgParallax', doParralax);
			doParralax();
		}, {
			watchFrom: 601
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
					$(this).trigger('load');
			});

			// Set images-loaded automatically after 3 seconds
			setTimeout(function() {
				if (current == totalCount) return;
				$html.addClass('images-loaded');
				progressBar.css('opacity', '0');
			}, 5000);
		})

		initialize("Feature #7: Smooth scroll to section", function(options) {
			$('a[href^="#"').click(function(event) {
				event.preventDefault();
				var hash = $(this).attr('href');
				var target = $(hash);
				var estimation = parseInt(target.offset().top) - parseInt(options.marginTop || 0);
				var actual = parseInt($('body').scrollTop());
				var distance = estimation > actual ? estimation - actual : actual - estimation;
				var duration = (distance * 0.2) + options.speed;

				$('html, body').animate({
					scrollTop: estimation
				}, duration, function() {
					if (history.pushState) {
						history.pushState(null, null, hash);
					} else {
						location.hash = hash.trim('#');
					}
				});
			});
		}, {
			marginTop: '100px',
			speed: 300
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
