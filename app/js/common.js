$("document").ready(function () {
	

//Browser detection

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

//-----------------------------

var accentColor = '#337755', greyColor = "#cccccc"; // global colors



Snap("#rings").animate({
	"fill-opacity":0.5
}, 3000, mina.easeout, function () {
	Snap("#points").animate({
		"fill-opacity":1,
		"stroke-opacity":1
	}, 3, mina.easeout, function () {
		$("#php").attr("transform", "scale(1)");
		setTimeout(function () {
			$("#clock, #www, #gear").attr({
				"transform":"scale(1)",
			});
		}, 100);
		setTimeout(function () {
			$("#tiles, #js").attr({
				"transform":"scale(1)"
			});
		}, 150);
		setTimeout(function () {
			$("#angular, #ruby, #css").attr({
				"transform":"scale(1)"
			});
		}, 350);
		setTimeout(function () {
			$("#mysql").attr({
				"transform":"scale(1)"
			});
		}, 380);
	});
});



$(".owl-carousel").owlCarousel({
	items: 1,
	nav: true,
	loop: true,
	autoplay: true,
	autoplayTimeout: 3000,
	autoplayHoverPause: true
});


//first screen slide
function slideFirst() {
		$('html, body').animate({
			scrollTop: $('#challenges').offset().top
		}, 500);
}


$('.scroll').click(slideFirst);

//auto sliding
setTimeout(function () {
	if ($(window).scrollTop() == 0) {
		slideFirst();
	}
}, 10000);

// icons animation
Snap.selectAll(".b-icon path").attr({
	'fill' : 'none',
	'stroke' : 'none',
	'transform-origin' : '50% 50%'
});

function IC(id, param) {
	this.obj = $(id);
	this.position = $(id).position().top;
	this.strs = Snap(id).selectAll(".icon-1-f path");
	this.mObj = Snap(id).selectAll(".icon-1-b path");
	this.scrolled = false;
	this.param = param;
	this.param.fill = greyColor;
	this.run = function () {
		this.scrolled = true;
		this.mObj.attr(this.param).animate({'transform':'translate(0, 0)'}, 3000, mina.easein);
		for (var i = 0; i < this.strs.length; i++) {
			var str = this.strs[i],
			len = Math.ceil(str.getTotalLength());
			str.attr({
				'strokeDasharray': len,
				'strokeDashoffset': len,
				'stroke-width': 2,
				'stroke-linecap':'round',
				'stroke': accentColor,
				'fill' : 'none'
			});
			(function() {
				var strClosure = str;
				Snap.animate(len, 0, function( val ){
					strClosure.attr({
						'strokeDashoffset': val,
					});
				}, 900, mina.easeout, function () {
					strClosure.attr({
						'fill' : accentColor,
						'stroke' : 'none'
					});
				});
			})();
				} //for
			};
		}


var iconCollection = [new IC("#icon1", {'transform':'translate(0, -50)'}),
						new IC("#icon2", {'transform':'rotate(-50)'}),
						new IC("#icon3", {'transform':'scale(1.2)'}),
						new IC("#icon4", {'transform':'translate(100, 0) rotate(80)'}),
						new IC("#icon5", {'transform':'scale(1.4) rotate(-50)'}),
						new IC("#aboutUsIcon", {})];

var winHeight = $(window).innerHeight();

$(window).scroll(function () {
	var top = $(window).scrollTop();
	if (top >= winHeight - $('.top-nav').height()) {
		$('.top-nav').addClass('regular-nav');
	} else {$('.top-nav').removeClass('regular-nav');}
	for (var i = 0; i < iconCollection.length; i++) {
		var run = top + winHeight >= iconCollection[i].position;
		if (!iconCollection[i].scrolled && run){
			iconCollection[i].run();
		}
	}
	// Assign active class to nav links while scolling
	$('section').each(function(i) {
			//console.log($(this).position().top);
			//console.log($('.navigation a').eq(i));
		if ($(this).position().top - $('.navigation').height() <= $(window).scrollTop()) {

			$('.navigation a.active').removeClass('active');
			$('.navigation a').eq(i).addClass('active');
		}
	});

});

//scroll to

$('.navigation a').bind('click', function(e) {
	e.preventDefault(); // prevent hard jump, the default behavior
	$(".navigation").removeClass("clicked");
	$(".hamburger--elastic").removeClass("is-active");
	var target = $(this).attr("href") || $(this).attr("data"), // Set the target as variable
		pos = $(target).offset().top; // navigation panel heigth
	// perform animated scrolling by getting top-position of target-element and set it as scroll target
	$('html, body').stop().animate({
		scrollTop: pos
	}, 600/*, function() {
			location.hash = target; //attach the hash (#jumptarget) to the pageurl
		}*/);

	return false;
});


// hamburger menu
	$('.hamburger--elastic').click(function () {
			$(this).toggleClass("is-active");
			$(".navigation").toggleClass("clicked");
	});


//E-mail Ajax Send

$("#contact-us").submit(function() { //Change
		var th = $(this);
		$.getJSON('//freegeoip.net/json/?callback=?', function(data) {
			$("input[name='customer-country']").attr('value', data.country_name);
			$("input[name='customer-ip']").attr('value', data.ip);
			$.ajax({
				type: "POST",
				url: "mail.php", //Change
				data: th.serialize()
			}).done(function() {
				$(".thanks").css("display", "table");
				$(".thanks").on("click", function () {
					$(".thanks").hide();
					$(".thanks").off("click");
				});
				$("#contact-us").hide();
				setTimeout(function() {
					// Done Functions
					th.trigger("reset");
				}, 1000);
			});
		});
	return false;
});
})