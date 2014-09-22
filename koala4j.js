/*
 * A javascript tool library
 * gao_st@126.com
 * https://github.com/situ2011/koala4j
 */

if (typeof jQuery == 'undefined') { throw new Error("Koala4j requires jQuery") }

/*
 * No.002 - image slider
 */
!function (window, document, $, undefined) {
	$('.koala-img-slide').each(function () {
		var $this = $(this),
			$imgs = $this.find('img'),
			len = $imgs.length,
			w = $imgs.width(),
			h = $imgs.height(),
			i,
			navLis = [],
			timer,
			counter = 1;
		
		// TODO set the link 
		$imgs
			.wrap('<a href="#"></a>')
			.parent()
			.first().addClass('active')
			.end()
			.wrapAll('<div class="wrap"></div>');
		
		$this
			.width( w )
			.height( h )
			.append('<ul class="nav"></ul>')
			.find('ul.wrap').width( w );
		
		for(i=1; i<=len; i++) {
			$this.find('a:nth-child('+i+')').attr('index', i);
			navLis.push('<li>'+i+'</li>');
		}
		
		$this
			.find('ul.nav').html(navLis.join(''))
			.find('li:first-child').addClass('active')
			.end()
			.find('li')
			.on('click', onNavClick);
		
		// event
		function onNavClick () {
			var navIndex = $(this).text(),
				activeA = $this.find('a.active'),
				actIndex = activeA.attr('index'),
				$target = $this.find('a:nth-child('+navIndex+')'),
				op;
				
			if (navIndex > actIndex) {
				$target.css({'left': w}).addClass('active');
				op = '-=';
			} else if (navIndex < actIndex) {
				$target.css({'left': -w}).addClass('active');
				op = '+=';
			} else {
				return;
			}
			
			$target
			.add(activeA)
			.animate({'left': op + w}, 500, function () {
				activeA.removeAttr('class').removeAttr('style').css({'left': 0});
			});
			
			$(this).addClass('active').siblings('li').removeClass('active');
			
			counter = navIndex;
		}
		
		function play () {
			counter = (counter >= len) ? 1 : ++counter;
			console.log( counter )
			$this.find('ul.nav li:nth-child('+counter+')').trigger('click');
		}
		
		timer = setInterval(play, 2000);
		$this.hover(function () {
			clearInterval(timer);
		}, function () {
			timer = setInterval(play, 2000);
		});
		
		console.log( $imgs )
	});
}(window, document, jQuery);

/*
 * No.001 - placeholder fix
 */
!function (window, document, $, undefined) {
	var target, i=0, len, tmpPh;
	if ( 'placeholder' in document.createElement('input') ) return;
	target = $('[placeholder]');
	for ( len = target.length; i<len; i++ ) {
		tmpPh = target[i].getAttribute( 'placeholder' );
		target[i].value = tmpPh;
		target[i].style.color = '#aaaaaa';
		target[i].onfocus = function () {
			if ( this.value != this.getAttribute( 'placeholder' ) ) return;
			this.value = '';
			this.style.color = '#000000';
		}
		target[i].onblur = function () {
			if ( this.value != '') return;
			this.value = this.getAttribute( 'placeholder' );
			this.style.color = '#aaaaaa';
		}
	}
}(window, document, jQuery);

/*
 * template
 */
!function (window, document, $, undefined) {
}(window, document, jQuery);