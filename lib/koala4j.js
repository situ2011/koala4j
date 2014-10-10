/*
 * A javascript tool library based on jQuery
 * https://github.com/situ2011/koala4j
 * gao_st@126.com
 */

/* koala image slider plugin */
!function ( window, $, undefined ) {
	var $sliders = $('div.kl-slider');
	$sliders.each(function () {
		var $slider = $( this ),
			width = $slider.find('img').width(),
			height = $slider.find('img').height(),
			navLiArr = [],
			oldIndex = 0,// *1
			timer,
			counter = 0,
			len;

		$slider.width( width ).height( height ).css('overflow', 'hidden');
		$slider.find('img').wrap('<a href="#"></a>');

		$slider.find('a').each(function () {
			$this = $( this );
			$this.attr( 'num', $this.index() ); // *2
			navLiArr.push('<li>'+ ( $this.index() + 1 )+'</li>')
		});

		len = $slider.find('a').length;

		$slider.append('<ul class="nav">'+navLiArr.join('')+'</ul>');
		$slider.append('<div class="prev">prev</div><div class="next">next</div>');

		$slider.find('.nav li:first-child').addClass('on');
		$slider.find('a:first-child').css('z-index', 9);

		function run () {
			var $this = $( this ),
				index = $this.index(), // *3
				$target = $slider.find('a[num='+index+']'),
				$oldTarget = $slider.find('a[num='+oldIndex+']');

			if ( oldIndex == index || $slider.find('a:animated').length > 0 ) return;

			$this.addClass('on').siblings('.on').removeClass('on');

			$target
				.css({'left': width, 'z-index': 9})
				.add($oldTarget)
				// .stop()
				.animate({
					'left': '-=' + width
				}, 500, function () {
					$oldTarget.css({'left': 0, 'z-index': 0});
					oldIndex = index;
			});

			counter = index;
		}

		$slider.find('.nav li').on( 'click', run );
		$slider.find('.prev, .next').on( 'click', function () {
			var $this = $(this);
			if ( $this.hasClass('prev') ) {
				counter--;
			} else {
				counter++;
			}
			if ( counter >= len ) counter = 0;
			$slider.find('.nav li:eq('+ counter +')').trigger('click');		
		});

		function autoPlay () {
			counter = ( counter >= len - 1 ) ? 0 : ++counter;
			$slider.find('.nav li:eq('+ counter +')').trigger('click');
		}

		timer = setInterval( autoPlay, 2000 );

		$slider.hover(function () {
			clearInterval( timer );
		}, function () {
			timer = setInterval( autoPlay, 2000 );
		});
	});
}( window, jQuery );

/* template */
!function ( window, $, undefined ) {
}( window, jQuery );


/*
!function ( window, $, undefined ) {
	var $sliders = $('div.kl-slider'),
		width = $sliders.find('img').width(),
		height = $sliders.find('img').height(),
		navLiArr = [],
		oldIndex = 0,// *1
		timer,
		counter = 0,
		len;

	$sliders.width( width ).height( height ).css('overflow', 'hidden');
	$sliders.find('img').wrap('<a href="#"></a>');

	$sliders.find('a').each(function () {
		$this = $( this );
		$this.attr( 'num', $this.index() ); // *2
		navLiArr.push('<li>'+ ( $this.index() + 1 )+'</li>')
	});

	len = $sliders.find('a').length;

	$sliders.append('<ul class="nav">'+navLiArr.join('')+'</ul>');
	$sliders.append('<div class="prev">prev</div><div class="next">next</div>');

	$sliders.find('.nav li:first-child').addClass('on');
	$sliders.find('a:first-child').css('z-index', 9);

	function run () {
		var $this = $( this ),
			index = $this.index(), // *3
			$target = $sliders.find('a[num='+index+']'),
			$oldTarget = $sliders.find('a[num='+oldIndex+']');

		if ( oldIndex == index || $sliders.find('a:animated').length > 0 ) return;

		$this.addClass('on').siblings('.on').removeClass('on');

		$target
			.css({'left': width, 'z-index': 9})
			.add($oldTarget)
			// .stop()
			.animate({
				'left': '-=' + width
			}, 500, function () {
				$oldTarget.css({'left': 0, 'z-index': 0});
				oldIndex = index;
		});

		counter = index;
	}

	$sliders.find('.nav li').on( 'click', run );
	$sliders.find('.prev, .next').on( 'click', function () {
		var $this = $(this);
		if ( $this.hasClass('prev') ) {
			counter--;
		} else {
			counter++;
		}
		if ( counter >= len ) counter = 0;
		$sliders.find('.nav li:eq('+ counter +')').trigger('click');		
	});

	function autoPlay () {
		counter = ( counter >= len - 1 ) ? 0 : ++counter;
		$sliders.find('.nav li:eq('+ counter +')').trigger('click');
	}

	timer = setInterval( autoPlay, 2000 );

	$sliders.hover(function () {
		clearInterval( timer );
	}, function () {
		timer = setInterval( autoPlay, 2000 );
	});

}( window, jQuery );
*/