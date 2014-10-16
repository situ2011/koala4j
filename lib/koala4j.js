/*
 * A javascript tool library based on jQuery
 * https://github.com/situ2011/koala4j
 * gao_st@126.com
 * since: 2012-10-18
 */

/* koala utils */
!function ( window, $, undefined ) {
	var koala = function () {}

	/* 获得地址栏参数 */
	koala.getQueryString = function (name) {
		var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");  
    	if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
	}

	/* 去除字符串两边的空格 */
	koala.trim = function (str) {
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　}
	/* 去除字符左边的空格 */
　　koala.ltrim = function(str) {
　　     return str.replace(/(^\s*)/g,"");
　　}
	/* 去除字符右边的空格 */
　　koala.rtrim = function(str) {
　　     return str.replace(/(\s*$)/g,"");
　　}

	/* 截取字符串, holder: 截取后附加字符 */
	koala.cutString = function(len, holder){
		if( holder ){
			var hd = String(holder), hdLen = hd.length, str = this.replace(compileReg[2],"$1 ");
			len = len >= hdLen ? len-hdLen : 0;
			holder = str.length > len ? hd : "";
			return str.substr(0,len).replace(/([^\x00-\xff]) /g,'$1')+holder;
		}
		return this.substr(0,len).replace(compileReg[2],'$1 ').substr(0,len).replace(/([^\x00-\xff]) /g,'$1');
	}

	/* 检测是否ie678浏览器 */
	koala.isIE678 = "\v" == "v";

	koala.isIE8 = !!'1'[0];

	koala.isIE6 = !koala.isIE8 && (!document.documentMode || document.compatMode == "BackCompat");

	koala.isIE7 = !koala.isIE8 && !koala.isIE6;
	
	window.kl = window.koala = koala;
}( window, jQuery );

/* koala tab plugin */
!function ( window, $, undefined ) {
	$('div.kl-tab').each(function () {
		var $tab = $( this ),
			type = $tab.attr('data-hover') ? 'mouseenter' : 'click',
			timer;

		$tab.find('.nav li:first-child').addClass('on').end().find('.wrap div:first-child').show();

		$tab
			.find('.nav li')
			.on(type, function () {
				var that = this;
				if ( type == 'mouseenter' ) {
					timer = setTimeout(function () {
						doTab(that);
					}, 350);
				} else {
					doTab( this );
				}
			})
			.on('mouseleave', function () {
				clearTimeout(timer);
			});

		function doTab ( it ) {
			$(it).addClass('on').siblings('.on').removeClass('on');
			$tab.find('.wrap div:eq('+$(it).index()+')').show().siblings(':visible').hide();
		}
	});
}( window, jQuery );

/* koala image slider plugin */
!function ( window, $, undefined ) {
	$('div.kl-slider').each(function () {
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
 * No.002 - 修复IE6背景缓存bug
 */
!function ( window, $, undefined ) {
	try{
		document.execCommand("BackgroundImageCache", false, true);
	}catch(e){}
}( window, jQuery );

/*
 * No.003 - 修复低版本IE不识别HTML5标签问题
 */
!function ( window, $, undefined ) {
	if( kl.isIE678 ){
		var html5 = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),
			i = html5.length;
		while(i--) document.createElement(html5[i]);
	}
}( window, jQuery );

/* template */
!function ( window, $, undefined ) {
}( window, jQuery );
