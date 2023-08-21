
////////////////////////////////////////////////////////////////////////////////
// Begin general support functions                                            //
////////////////////////////////////////////////////////////////////////////////

$.preloadImages = function() {
	for (var i = 0; i < arguments.length; i++) { 
		var img = new Image();
		img.src = arguments[i];
		img = null;
	} 
}

function include_js(script_filename) { // call by: include_js("URL")
	var html_doc = document.getElementsByTagName("head").item(0);
	var js = document.createElement("script");
	js.setAttribute("language", "javascript");
	js.setAttribute("type", "text/javascript");
	js.setAttribute("src", script_filename);
	html_doc.appendChild(js);
	html_doc = js = null;
	return false;
}

var docCookies = { // Get and Set cookies
	getItem: function ( sKey ) {
		return decodeURIComponent( document.cookie.replace( new RegExp( "(?:(?:^|.*;)\\s*" + encodeURIComponent( sKey ).replace( /[\-\.\+\*]/g, "\\$&" ) + "\\s*\\=\\s*([^;]*).*$)|^.*$" ), "$1" ) ) || null;
	},
	setItem: function ( sKey, sValue, vEnd, sPath, sDomain, bSecure ) {
		if ( ! sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test( sKey ) ) { return false; }
		var sExpires = "";
		if ( vEnd ) {
			switch ( vEnd.constructor ) {
				case Number:
				sExpires = ( vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd );
				break;
				case String:
				sExpires = "; expires=" + vEnd;
				break;
				case Date:
				sExpires = "; expires=" + vEnd.toUTCString();
				break;
			}
		}
		document.cookie = encodeURIComponent( sKey ) + "=" + encodeURIComponent( sValue ) + sExpires + ( sDomain ? "; domain=" + sDomain : "" ) + ( sPath ? "; path=" + sPath : "" ) + ( bSecure ? "; secure" : "" );
		return true;
	},
	removeItem: function ( sKey, sPath, sDomain ) {
		if ( ! sKey || ! this.hasItem( sKey ) ) { return false; }
		document.cookie = encodeURIComponent( sKey ) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "" ) + ( sPath ? "; path=" + sPath : "" );
		return true;
	},
	hasItem: function ( sKey ) {
		return ( new RegExp( "(?:^|;\\s*)" + encodeURIComponent( sKey ).replace( /[\-\.\+\*]/g, "\\$&") + "\\s*\\=" ) ).test( document.cookie );
	},
	keys: function ( ) {
		var aKeys = document.cookie.replace( /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "" ).split( /\s*(?:\=[^;]*)?;\s*/ );
		for ( var nIdx = 0; nIdx < aKeys.length; nIdx++ ) { aKeys[nIdx] = decodeURIComponent( aKeys[nIdx] ); }
		return aKeys;
	}
};


////////////////////////////////////////////////////////////////////////////////
// End general support functions                                              //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Begin myAWAI login functions                                               //
////////////////////////////////////////////////////////////////////////////////

function myawaiCheckCapsLock(e, t) {
	e = (e) ? e : window.event;
	var ismyawai = (t.id.indexOf("myawai") == 0);
	var w = (ismyawai) ? "div.capslockwarning" : "p#capslockwarning";
	var kc = ((e.which) ? e.which : e.keyCode), sk = e.shiftKey;
	$(w).hide().html("");
	if (!(/Mobi/.test(navigator.userAgent)) && ((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122 ) && sk)) {
		$(w).show().html("Warning: your 'Caps Lock' is on and your password is case sensitive.");
	}
	if (ismyawai) { $("div.myawaicontrol").css("height","auto"); }
}

function myawaiLogin(f) {
	var m = (f.id.indexOf("myawaimenu") == 0) ? "myawaimenu-" : "";
	var u = "input#" + m + "username", p = "input#" + m + "password";
	if (!$(u).val() || $(u).val() == "username") {
		alert("Please enter your email address in the username field");
		$(u).focus();
		return(false);
	}
	if ($(f).find("input:radio[name=new_user]:checked").val() != 1) {
		if (!$(p).val() || ($(p).val() == "password" && ($(p).css("color") == "#aaaaaa" || $(p).css("color") == "rgb(170, 170, 170)"))) {
			alert("Please enter your password or click the 'forgot password' link if you have lost it");
			$(p).focus();
			return(false);
		}
	}
	return(true);
}

function myawaiForgotPass(f) {
	var m = (f.id.indexOf("myawaimenu") == 0) ? "myawaimenu-" : "";
	var u = "input#" + m + "username", p = "input#" + m + "password";
	if ($(u).val() == "" || $(u).val() == "username") {
		alert("Please enter your email address in the username field");
		$(u).focus();
		return(false);
	}
	$(f).find("input:radio[name=new_user]").val(0);
	$(p).prop("disabled", false).val("forgotten-it");
	$(f).submit();
	return(false);
}

/*function myawaiFillField(field) {
	var f = $(field);
	if (!f.val()) {
		if (f.hasClass("searchbox")) {
			f.val("Search");
		}
		else {
			f.css("color","#aaaaaa");
			if (f.hasClass("subscribe-email")) {
				f.val("email address");
			}
			if (f.hasClass("subscribe-name")) {
				f.val("first name");
			}
		}
	}
	f = null;
}

function myawaiEmptyField(field) {
	var f = $(field);
	if ((f.hasClass("searchbox") && f.val() == "Search")) {
		f.val("");
	}
	else if ((f.hasClass("subscribe-email") && f.val() == "email address") ||
	(f.hasClass("subscribe-name") && f.val() == "first name")) {
		f.css("color","#000000").val("");
	}
	f = null;
}*/

function myawaiChangePass() {
	var newpassword = "input#newpassword";
	var verifynewpassword = "input#verifynewpassword";
	var error = "";
	var str = $(newpassword).val();
	if (str.length < 5) {
		error = "Password must be at least 5 characters long";
	}
	if ($(newpassword).val() != $(verifynewpassword).val()) {
		error = "Passwords do not match";
	}
	if (error != "") {
		alert(error);
		$(newpassword).val('');
		$(verifynewpassword).val('');
		$(newpassword).focus();
		return(false);
	}
	return(true);
}

////////////////////////////////////////////////////////////////////////////////
// End myAWAI login functions                                                 //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Begin Page load functions                                                  //
////////////////////////////////////////////////////////////////////////////////

function class_init(context){
	
	$("div.awai-info", context).each(function() {
		$(this).animate({backgroundColor:'#FEFFD1'}, 5000);
	});

	$("a.expandable", context).add("a.collapsible", context).add("a.expander", context).click(function() {
		var h = this.href;
		var a = h.substr(h.indexOf("#"));
		var div = $("div" + a);
		if ($(this).hasClass("expandable") || $(this).hasClass("collapsible")) {
			$(this).toggleClass("expandable").toggleClass("collapsible");
		}
		if (div.is(":visible")) {
			div.data("ref-height", div.height());
			div.animate({height:0}, {duration:"fast", complete:function() { $(this).hide(); }} );
		} else  {
			div.show().animate({height:div.data("ref-height")}, {duration:"fast"});
		}
		div = null;
		this.blur();
		return false;
	});

	$("a.expandall", context).click(function(){
		$("div.expandable", context).each(function(){
			var div = $(this);
			if (!div.is(":visible")) {
				div.show().animate({height:div.data("ref-height")}, {duration:"fast"});
			}
			div.addClass("collapsible").removeClass("expandable");
			div = null;
		});
		$("a.expandable", context).addClass("collapsible").removeClass("expandable");
		this.blur();
		return false;
	});

	$("a.collapseall", context).click(function(){
		$("div.collapsible", context).each(function(){
			var div = $(this);
			if (div.is(":visible")) {
				div.data("ref-height", div.height());
				div.animate({height:0}, {duration:"fast", complete:function() { $(this).hide(); }} );
			}
			div.addClass("expandable").removeClass("collapsible");
			div = null;
		});
		$("a.collapsible", context).addClass("expandable").removeClass("collapsible");
		this.blur();
		return false;
	});

	/*$("input.searchbox, input.subscribe-email, input.subscribe-name", context).each(function(){
		$(this).blur(function() {
			myawaiFillField(this);
			return true;
		});
		$(this).click(function() {
			myawaiEmptyField(this);
			return true;
		});
		$(this).focus(function() {
			myawaiEmptyField(this);
			return true;
		});
		myawaiEmptyField(this);
		myawaiFillField(this);
		return true;
	});*/

	$("a.myawaimenu-forgotpass", context).click(function(){
		myawaiForgotPass($("form#myawaimenu-login")[0]);
		return false;
	});
	
	$("a.forgotpass", context).click(function(){
		myawaiForgotPass($("form#login")[0]);
		return false;
	});
	
	$("a.js-hide", context).click(function(){
		var searchclass = this.rel || false;
		if (searchclass) {
			$("." + searchclass).hide();
		}
		this.blur();
		return false;
	});
	
	$("a.js-show", context).click(function(){
		var searchclass = this.rel || false;
		if (searchclass) {
			$("." + searchclass).show();
		}
		this.blur();
		return false;
	});
	
	$("a.js-toggle", context).click(function(){
		var searchclass = this.rel || false;
		if (searchclass) {
			$("." + searchclass).toggle();
		}
		this.blur();
		return false;
	});
	
	// Locate possible uses before removing this function. JK - 2021-11-15
	$("a.js_action", context).click(function(){
		var h = this.href || false;
		if (!h) {
			return false;
		}
		var actions = h.split('?')[1];
		if (!actions) {
			return false;
		}
		var actions = actions.split('&');
		for (var i = 0; i < actions.length; i++) {
			action = actions[i];
			parts = action.split('=');
			func = parts[0];
			param = parts[1];
			if (param) {
				params = param.split(',');
				param = '';
				for (var j = 0; j < params.length; j++) {
					if (param) {
						param = param + ",";
					}
					param = param + "'" + params[j] + "'";
				}
			}
			if (typeof window[func] != 'function') {
				continue;
			}
			eval("window[func](" + param + ")");
		}
		this.blur();
		return false;
	});
	
	$("a.js-confirm", context).click(function(){
		return js_confirm(this, "link");
	});

	$("form.js-confirm", context).submit(function(){
		return js_confirm(this, "form");
	});

	$("form.check-requirements", context).submit(function() {
		var complete = true;
		$(this).find(".required, select.required-if-list").each(function() {
			if ($(this).val() == "") {
				if (complete) {
					alert("Please fill in all required fields");
					if ($(this).attr("type") != "hidden") {
						$(this).focus();
					}
					complete = false;
				}
				if (!$(this).data("border-changed")) {
					$(this).data("previous-border-color", $(this).css("border-top-color"));
					$(this).css("border-color", "#ff0000");
					$(this).css("background-color", "#ffffcc");
					$(this).data("border-changed", true);
				}
			}
		});
		$(this).find(".max-length").each(function() {
			var pattern = /^(?:.*\s)?max-length-(\d+)(?:\s.*)?$/;
			var maxLength = $(this).attr("class").replace(pattern, "$1");
			if (isNaN(maxLength) || maxLength <= 0 || maxLength > 100000) {
				return;
			}
			if ($(this).val().length > maxLength) {
				if (complete) {
					alert("Please shorten your input to " + maxLength + " characters");
					if ($(this).attr("type") != "hidden") {
						$(this).focus();
					}
					complete = false;
				}
				if (!$(this).data("border-changed")) {
					$(this).data("previous-border-color", $(this).css("border-top-color"));
					$(this).css("border-color", "#ff0000");
					$(this).css("background-color", "#ffffcc");
					$(this).data("border-changed", true);
				}
			}
		});
		if (complete) {
			var th = this;
			$(th).find("input[type='hidden']").each(function() {
				var hidden_field = this;
				if ($(th).find("input[name='" + hidden_field.name + "'][type!='hidden'][value!='']").length) {
					$(hidden_field).remove(); // Remove hidden fields that have a visible field set with the same name
				}
			});
			$(this).find("button.submit-once").attr("disabled", "disabled").html("Please Wait...");
			$(this).find("input.submit-once").attr("disabled", "disabled").val("Please Wait...");
		}
		return complete;
	});
	
	$("form.check-requirements", context).find(".required, select.required-if-list").blur(function() {
		if ($(this).val() == "") {
			$(this).css("background-color", "#ffffcc");
		}
		else {
			$(this).css("background-color", "#ffffff");
			if ($(this).data("border-changed") && $(this).data("previous-border-color")) {
				$(this).css("border-color", $(this).data("previous-border-color"));
				$(this).data("border-changed", null);
			}
		}
	});

	// Submit forms that do not have a normal submit button
    $("form.enter-submit input", context).keypress(function(e){
        if (e.keyCode == 13) {
			$(this).parents("form").trigger("submit");
 			return false;
       }
    });

	$("input", context).add("select", context).add("textarea", context).each(function() {
		showLength(this, false);
	}).keyup(function() {
		showLength(this, true);
	}).click(function() {
		showLength(this, true);
		showNote(this);
	}).focus(function() {
		showNote(this);
	}).blur(function() {
		hideNote(this);
		showLength(this, false);
	});
	
	$("input.focus-select, textarea.focus-select", context).focus(function() {
		$(this).select();
	});
		
	$("textarea.expanding", context).elastic();
	
	$("textarea.focus-expanding", context).one("focus", function() { $(this).elastic(); });
	
	$("button:has(a)", context).click(function() {
		var h = $(this).find("a").attr("href");
		window.location = h;
		return false;
	});

	$("input.copy-to-contact", context).change(function() {
		var id = $(this).attr("id").replace("_", "_contact_");
		if (!$("#" + id).val()) {
			$("#" + id).val($(this).val());
			$("#" + id).blur();
		}
	});

	$(".countries", context).change(function() {
		getStates($(this), true);
	});

	$(".comment-hidden", context).hide();
	$(".comment-content", context).focus(function() {
		$(".comment-hidden").show();
	});

	$("a.captcha_refresh", context).click(function(){
		$('.captcha_image').attr("src", "captcha.png?random=" + Math.random());
		this.blur();
		return false;
	});
	
/*	$("a.content-overlay", context).click(function() {
		var url = this.href;
		var temp_url = url.split("#");
		var anchor_hash = temp_url[1];
		temp_url = temp_url[0].split("?");
		var query = temp_url[1];
		var vars = new Array();
		if (query) {
			var vars = query.split("&");
		}
		vars.push("mode=content");
		query = vars.join("&");
		this.href = temp_url[0] + "?" + query;
		tb_show(this,"link");
		this.href = url;
		this.blur();
		return false;
	});

	$("a.remove-overlay", context).click(function() {
		if (self.parent.document.getElementById("TB_window")) {
			self.parent.tb_remove();
			return false;
		}
	});*/

	$("a.thickbox", context).magnificPopup({ // TEMP OVERRIDE: DISABLE THICKBOX
		type: 'iframe',
	});

	$("a.content-overlay", context).each(function() {
		var url = this.href;
		var temp_url = url.split("#");
		var anchor_hash = temp_url[1];
		temp_url = temp_url[0].split("?");
		var query = temp_url[1];
		var vars = new Array();
		if (query) {
			var vars = query.split("&");
		}
		vars.push("mode=content");
		query = vars.join("&");
		$(this).attr('data-mfp-src', temp_url[0] + "?" + query).magnificPopup({
			type: 'ajax',
			mainClass: 'mfp-content-overlay',
			closeBtnInside: false,
			callbacks: {
				parseAjax: function(mfpResponse) {
					mfpResponse.data = '<div class="mfp-ajax-scaler">'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-ajax-frame">'+
					mfpResponse.data+
					'</div>'+
					'</div>';
				},
				ajaxContentAdded: function() {
					$('.mfp-content-overlay div.mfp-close').replaceWith( $('.mfp-content-overlay button.mfp-close') );
					class_init( $('.mfp-content-overlay') );
					site_class_init( $('.mfp-content-overlay') );
				}
			}
		});
	});

	$("a.remove-overlay", context).on('click', function() {
		if ($.magnificPopup) {
			$.magnificPopup.close();
			return false;
		}
	});

	$(".clickable", context).each(function() {
		makeClickable(this);
	});
	
	$("a.no-click", context).click(function() {
		return false;
	});
	
	$("a.click-once", context).click(function() {
		$(this).replaceWith("<span class='nonlink'>Please Waitâ€¦</span>");
		return true;
	});
	
	$("a", context).not(".nopop").not(".hybrid-video").not(".hybrid-audio").each(function() {
		var t = this, h = $(t).attr("href");
		var x = [location.hostname, "www.awai.com", "www.awaionline.com", "awai.infusionsoft.app", "awai.infusionsoft.com", "awai.isrefer.com"];
		var p = $(t).hasClass("popup") ? true : false;
		if (h && (h.substr(-4) == ".doc" || h.substr(-4) == ".pdf")) {
			p = true;
		}
		if (!p && h && (h.indexOf("http:") != -1 || h.indexOf("https:") != -1)) {
			p = true;
			for (var i = 0; i <= (x.length - 1); i++){
				if (t.hostname.substr(t.hostname.length - x[i].length) == x[i]) {
					p = false;
					break;
				}
			}
		}
		if (p) {
			$(t).attr("target", "_blank");
/*			$(t).click(function(){ var w = window.open(h); w.focus(); return false; });*/
		}
		t = null;
	});
	
	$(".responsive-media", context).fitVids();
	
	$(".scrolltop", context).click(function() {
		var el = this;
		$(window).scrollTop($(el).offset().top);
		el = null;
	});

	if (typeof($.fn.superfish) == "function") {
//		$("ul.sf-menu", context).each(function() {
		$("ul.sf-menu", context).not("nav ul").each(function() { // Temporary Disable for DEV template only. JT 2018-04-26
			var sd = 70;
			if ($(this).parent().hasClass("member-button")) sd = 500;
			$(this).supersubs({minWidth:10, maxWidth:40, extraWidth:1}).superfish({showDelay:sd});
		});
	}

	if (typeof($.ui) == "object") {
		var accordion_header = "h2, .accordion-header";
		$(".accordion", context).accordion({ header: accordion_header, heightStyle: "content" });
		$(".accordion", context).each(function() {
			var self = this;
			var selected = false;
			if ($(self).hasClass("collapsed")) {
				$(self).accordion("option", "collapsible", true);
				$(self).accordion("option", "active", null);
			}
			if ((selected = $(self).children(".ui-widget-content").index($(self).children(".selected"))) != -1) {
				$(self).accordion("option", "active", selected);
			}
			if (location.hash && $(self).find(location.hash) && $(self).is(":visible")) {
				if ((selected = $(self).children(".ui-widget-content").index($(self).find(location.hash))) != -1) {
					$(self).accordion("option", "active", selected);
					$(self).oneTime(500, function() {
						$(window).scrollTop(Math.max(0, $(self).find(location.hash).prev(accordion_header).offset().top - 20));
					});
				}
			}
			$(self).find(".accordion-jump").click(function() {
				var target = $($(this).attr("href"));
				var selected = $(self).children(".ui-widget-content").index(target);
				$(self).accordion("option", "active", selected);
				return false;
			});
		});

		$(".accordion", context).accordion({
			beforeActivate: function(event, ui) {
				if (ui.newHeader.offset() && ui.oldHeader.offset() && ui.oldPanel.height() && ui.newHeader.offset().top > ui.oldHeader.offset().top) {
//					$("html, body").animate({scrollTop: (Math.min($(window).scrollTop(), Math.max(0, (ui.newHeader.offset().top - ui.oldPanel.height()) - 100)))});
					$(window).scrollTop(Math.min($(window).scrollTop(), Math.max(0, (ui.newHeader.offset().top - ui.oldPanel.height()) - 100)));
				}
			},
			activate: function(event, ui) {
				if (ui.newPanel.offset()) {
					ui.newPanel.find("a.inline-video:visible").each(function() {
						handleMedia(this, "video", "inline");
					});
//					ui.newPanel.find( $(".tabs-fit", context) ).tabs("fit");
					ui.newPanel.find(".tabs").tabs();
					ui.newPanel.find(".tabs-fit").tabs().tabs("fit");
					ui.newPanel.find(".tabs-equal").tabs().tabs("fit", true);
				}
			}
        });

		$(".tabs", context).tabs();
		$(".tabs-fit", context).tabs().tabs("fit");
		$(".tabs-equal", context).tabs().tabs("fit", true);
		$(".tabs, .tabs-fit, .tabs-equal", context).each(function() {
			var self = this;
			var selected = false;
			if ((selected = $(self).children(".ui-widget-content").index($(self).children(".selected"))) != -1) {
				$(self).tabs("option", "active", selected);
			}
			if (location.hash && $(self).find(location.hash) && $(self).is(":visible")) {
				$(self).oneTime(500, function() {
					$(window).scrollTop(Math.max(0, $(self).offset().top - 20));
				});
			}
			$(self).find(".tabs-jump").click(function() {
				var target = $($(this).attr("href"));
				var selected = $(self).children(".ui-widget-content").index(target);
				$(self).tabs("option", "active", selected);
				return false;
			});
		});
		$(".tabs-bottom .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *", context)
			.removeClass("ui-corner-all ui-corner-top")
			.addClass("ui-corner-bottom"); // move the nav to the bottom
		$(".tabs-bottom .ui-tabs-nav", context).each(function() {
			$(this).appendTo($(this).parents(".tabs-bottom").eq(0));
		});
		
		$(".tabs, .tabs-fit, .tabs-equal", context).tabs({
			activate: function(event, ui) {
				ui.newPanel.find("a.inline-video:visible").each(function() {
					handleMedia(this, "video", "inline");
				});
			}
        });
	}

	/* Handle Media substitutions LAST in the class_init function, AFTER ui-tabs and accordion */
	$("a.inline-video", context).each(function() {
		if (!$(this).parents("[aria-hidden='true'], [aria-expanded='false']").length) { // inline-video within hidden tabs and accordion panels will be handled separately
			handleMedia(this, "video", "inline");
		}
	});

	// Consider reducing comment duplicates below. JK - 2021-11-16
	$("a.popup-video", context).click(function() {
		if (handleMedia(this, "video", "popup")) {
			return false; // if handleMedia is successful return false for the default click action
		}
	});

	$("a.hybrid-video", context).click(function() {
		if (handleMedia(this, "video", "hybrid")) {
			return false; // if handleMedia is successful return false for the default click action
		}
	});

	$("a.inline-audio", context).each(function() {
		handleMedia(this, "audio", "inline");
	});

	$("a.popup-audio", context).click(function() {
		if (handleMedia(this, "audio", "popup")) {
			return false; // if handleMedia is successful return false for the default click action
		}
	});

	$("a.hybrid-audio", context).click(function() {
		if (handleMedia(this, "audio", "hybrid")) {
			return false; // if handleMedia is successful return false for the default click action
		}
	});

	// Consider deletion. JK - 2021-11-16
/*	$(window).scroll(function() {
		$(".scrolltop").each(function() {
			var el = $(this), w = $(window);
			var f_1 = el.find("iframe").contents(), f_2 = f_1.find("iframe").contents();
			var els = el.add(el.find("*")).add(f_1.add(f_2).find("*"));
			els.one("click.scrolltop focus.scrolltop keypress.scrolltop", function() {
//				alert("test"); // DEBUG
				els.unbind("click.scrolltop focus.scrolltop keypress.scrolltop");
				w.scrollTop(el.offset().top);
			});
			f_1.add(f_2).unbind("scroll.scrolltop").bind("scroll.scrolltop", function() { w.scrollTop(el.offset().top); });
			el[0] = w[0] = null;
		});
	});*/

} // end of class_init() function

function test_function(parameter, parameter2) {
	alert(parameter + " - " + parameter2);
}

function print_date(){
	
	var mydate=new Date();
	var year=mydate.getFullYear();
	var day=mydate.getDay();
	var month=mydate.getMonth();
	var daym=mydate.getDate();
	var dayarray=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday","Saturday");
	var montharray=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	$(".printdate").html(dayarray[day]+" "+montharray[month]+" "+daym+", "+year);

}

////////////////////////////////////////////////////////////////////////////////
// End Page load functions                                                    //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Begin Thickbox Override                                                    //
////////////////////////////////////////////////////////////////////////////////

function tb_init(domChunk){ // TEMP OVERRIDE: DISABLE THICKBOX
	return {};
}

function tb_show(settings){ // TEMP OVERRIDE: DISABLE THICKBOX
	var a = $('<a></a>');
	a.attr("href", settings.href);
	a.magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-auto',
/*		callbacks: {
			open: function() {
				$('.mfp-auto').addClass('mfp-auto-ready');
			}
		}*/
	}).magnificPopup('open');
}

function tb_remove(){ // TEMP OVERRIDE: DISABLE THICKBOX
	if ($.magnificPopup) {
		$.magnificPopup.close();
		return false;
	}
}

////////////////////////////////////////////////////////////////////////////////
// End Thickbox Override                                                      //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Begin Misc. functions                                                      //
////////////////////////////////////////////////////////////////////////////////

function js_hide(searchclass) {
	if (searchclass) {
		$("." + searchclass).hide();
	}
	return true;
}
	
function js_show(searchclass) {
	if (searchclass) {
		$("." + searchclass).show();
	}
	return true;
}
	
function js_toggle(searchclass) {
	if (searchclass) {
		$("." + searchclass).toggle();
	}
	return true;
}
	
function js_confirm(th, type){
	var t = th.title || th.name || null;
	var g = th.rel || false;
	var answer = confirm(t+"\n\nAre you sure you want to do this?");
	if (answer){
		var url = (type == "form") ? th.action : th.href;
		url = url.split("?");
		var query = url[1];
		url = url[0];
		if (query) {
			var vars = query.split("&"); 
			var newquery = "";
			for (var i=0;i<vars.length;i++) { 
				var pair = vars[i].split("="); 
				if (pair[0] != "jf_confirm" && pair[0] != "lp_confirm") {
					if (newquery.length > 0) {
						newquery = newquery + "&";
					}
					newquery = newquery + vars[i];
				}
			}
			if (newquery.length > 0) {
				url = url + "?" + newquery;
			}
		}
		if (type == "form") {
			th.action = url;
			if (th.jf_confirm) {
				th.jf_confirm.value = 0;
			}
			if (th.lp_confirm) {
				th.lp_confirm.value = 0;
			}
		}
		else {
			th.href = url;
		}
		return true;
	}
	th.blur();
	return false;
}

function showNote(input) {
	if ($(input).attr("id")) {
		$("#" + $(input).attr("id") + "_note").oneTime(150, function() {
			$(this).show("fast");
		});
	}
}

function hideNote(input) {
	if ($(input).attr("id")) {
		$("#" + $(input).attr("id") + "_note").oneTime(150, function() {
			$(this).hide("fast");
		});
	}
}

function showLength(input, to_cursor) {
	if ($(input).attr("id")) {
		$("#" + $(input).attr("id") + "_length").stopTime("show_length").oneTime(150, "show_length", function() {
			var len = $(input).val().length;
			if (len) {
				var s = (len == 1) ? "" : "s";
				var message = "[<strong>" + len + "</strong> character" + s;
				var cursor = (to_cursor) ? getCursor(input) : 0;
				if (cursor > 0 && cursor < len) {
					message += " (<strong>" + cursor + "</strong> to cursor)";
				}
				message += "]";
				$(this).html(message);
			}
			else {
				$(this).html("");
			}
		});
	}
}

function getCursor(input) {
	if (input.setSelectionRange) {
		return input.selectionStart;
	}
	else if (document.selection != null) {
		var val = $(input).val();
		var range = document.selection.createRange();
		var len = range.text.length;
		var marker = '|';
		while (val.indexOf(marker) != -1) {
			marker = marker + '|';
		}
		range.text = marker + range.text;
		var val2 = $(input).val();
		var cursor = val2.indexOf(marker);
		$(input).val(val);
		var range = input.createTextRange();
		range.moveStart('character', cursor);
		range.moveEnd('character', (cursor + len - val.length));
		range.select();
		return cursor;
	}
	return false;
}

function getStates(countries, go_to_states) {
	var country_code = countries.val();
	var index = $("*").index( $("#" + countries.attr("id")) );
	var oldstates = $("*:lt(" + index + ")").filter(".states").last();
	var countries_with_states = Array("AU", "BR", "CA", "EI", "NL", "UK", "US");
	var to_select = ($.inArray(country_code, countries_with_states) > -1 ? true : false);
	var from_select = (oldstates.is("select")) ? true : false;
	if (!to_select && !from_select) {
		return{};
	}
	var states = (to_select) ? $("<select></select>") : $("<input type=\"text\" />");
	for (var i = 0, attributes = oldstates[0].attributes; i < attributes.length; ++i) {
		if (attributes[i].name.match(/^(type|size)$|jquery/i)) { continue; }
		states.attr(attributes[i].name, attributes[i].value);
	}
	if (to_select) {
		states.load("/states.php?country=" + country_code, function() {
			states.val(oldstates.val());
			oldstates.replaceWith(states);
			oldstates[0] = null;
			states.closest("form").children().unbind();
			class_init(states.closest("form"));
			if (go_to_states) {
				countries.blur();
				states.focus();
			}
		});
	}
	else {
		oldstates.replaceWith(states);
		oldstates[0] = null;
		states.closest("form").children().unbind();
		class_init(states.closest("form"));
		if (go_to_states) {
			countries.blur();
			states.focus();
		}
	}
}

function makeClickable(obj) {
	$(obj).addClass("clickable").click(function(e) {
		var a = $(this).find("a");
		if (!$(e.target).is("a") && (h = a.attr("href"))) {
			if (a.attr("target") == "_blank") {
				var w = window.open(h); 
				w.focus(); 
				return false;
			}
			window.location = h;
			return false;
		}
		a[0] = null;
	});
}

function handleMedia(a, type, placement) {
	if (window.location.href.indexOf("no-embeds=1") != -1) {
		return false; // disable upon request
	}
//	var href = $(a).attr("href"); // Use a.href instead for fully qualified URL
	var href = a.href;
	var newVars = new Object();
	var url_parts = href.split("?");
	var query = url_parts[1];
	var toolbox = "https://www.awai.com/toolbox/";
	var handler = false;
	var video_id = false;
	var frame_id = false;
	var script_html = '';
	var width = (type == "audio") ? "300" : "320";
	var height = (type == "audio") ? "30" : "256";
	var width_custom = false, height_custom = false;
	var control_height = "0";
//	newVars["wmode"] = "transparent"; // Fix Z-index
	if (type == "audio") {
//		if (href.indexOf(".wav") != -1) {
//			width = "300";
//			height = "20";
//		}
//		else {
			handler = toolbox + "audio.php";
			newVars["media"] = escape(href);
//		}
	}
	else {
		if (href.indexOf("viddler.com") != -1) {
//			handler = toolbox + "viddler.php";
//			newVars["media"] = escape(href);
			newVars["f"] = "1";
			var matches = url_parts[0].match(/viddler\.com\/(\w+)\/(\w+)\/(?:0\/(\w+)\/)?$/);
			newVars["player"] = matches[1];
			if (newVars["player"] == "player") {
				newVars["player"] = "arpeggio"; // Set Default Player
			}
			else if (newVars["player"] == "mini" || newVars["player"] == "simple" || newVars["player"] == "full") {
				newVars["player"] = "arpeggio"; // Set Default Player
			}
			video_id = matches[2];
			if (matches[3]) {
				newVars["secret"] = matches[3];
			}
			handler = "https://www.viddler.com/embed/" + video_id + "/";
			frame_id = "viddler-" + video_id;
			width = "560";//"437";
			height = "317";//"328";
			if (newVars["player"] == "simple") {
//				height = "348";
				control_height = "20";
			}
			else if (newVars["player"] == "arpeggio") {
//				height = "343";
//				control_height = "15"; // controls are now integrated within video size
//				newVars["playback_speed_controls"] = "true"; // not working for videos in tabs and accordion
				newVars["make_responsive"] = "1";
			}
			else if (newVars["player"] == "full") {
//				height = "370";
				control_height = "42";
			}
		}
		else if (href.indexOf("player.vimeo.com") != -1) {
			handler = url_parts[0];
			newVars["title"] = "0";
			newVars["byline"] = "0";
			newVars["portrait"] = "0";
			width = "400";
			height = "225";
		}
		else if (href.indexOf("youtube.com") != -1) {
			var matches = url_parts[0].match(/youtube\.com\/v\/([^\/]+)/);
			video_id = matches[1];
			handler = "https://www.youtube.com/embed/" + video_id;
			frame_id = "youtube-" + video_id;
/*			handler = toolbox + "youtube.php";
			newVars["media"] = escape(href);
			width = "425";
			height = "344";*/
			width = "400";
			height = "225";
		}
	}
	if (query) {
		var vars = query.split("&");
		for (var i = 0; i < vars.length; ++i) {
			var pair = vars[i].split("=");
			if (pair[0] == "width") {
				width = pair[1];
				width_custom = true;
				if (handler.indexOf(toolbox) == -1) {
					continue;
				}
			}
			if (pair[0] == "height") {
				pair[1] = +pair[1] + +control_height;
				height = pair[1];
				height_custom = true;
				if (handler.indexOf(toolbox) == -1) {
					continue;
				}
			}
			newVars[pair[0]] = pair[1];
		}
	}
	if (placement == "hybrid" || placement == "popup") {
		newVars["autoplay"] = "1";
	}
	if (!handler) {
		handler = toolbox + "quicktime.php";
		newVars["media"] = escape(href);
		newVars["type"] = type;
	}
	
	var devtest = false; // DEBUG
	if (href.indexOf("devtest") != -1 && href.indexOf("viddler.com") != -1) {
/*		var script_html = ($(".viddler-auto-embed").length) ? '' : '<script type="text/javascript" src="https://static.cdn-ec.viddler.com/js/arpeggio/v3/build/main-built.js"></script>';*/
/*		var frame_html = '<div class="viddler-auto-embed ' + placement + '-player" data-video-id="' + video_id + '"';
		frame_html += (width_custom || height_custom) ? ' data-width="' + width + '" data-height="' + height + '" style="width:' + width + 'px; height:' + height + 'px; display:inline-block;"' : '" data-width="100%"';
		frame_html += (newVars["secret"]) ? ' data-secret="' + newVars["secret"] + '"' : '';
		frame_html += ' data-playback-speed-controls="true"';
		frame_html += ' data-autoplay="' + (newVars["autoplay"] ? 'true' : 'false') + '"></div>';*/
		
/*		var script_html = ($(".aw-viddler").length) ? '' : '<script type="text/javascript" src="https://static.cdn-ec.viddler.com/js/arpeggio/v3/build/main-built.js"></script>';*/
		var frame_html = '<div class="aw-viddler" id="aw-' + video_id + '"></div>';
		devtest = true;
	}
	else {
		var newQuery = "";
		for (var key in newVars) {
			if ( key === 'length' || ! newVars.hasOwnProperty( key ) ) continue;
			newQuery += ((newQuery) ? "&" : "") + key + "=" + newVars[key];
		}
		frame_id = (frame_id) ? 'id="' + frame_id + '" ' : '';
//		var frame_html = '<div class="responsive-media" style="' + ((width) ? 'max-width:' + width + 'px;' : '') + ((height) ? ' max-height:' + height + 'px;' : '') + '"><iframe ' + frame_id + 'src="' + handler + '?' + newQuery + '"' + ((width) ? ' width="' + width + '"' : '') + ((height) ? ' height="' + height + '"' : '') + ' frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" scrolling="no" class="jsmedia ' + placement + '-player"></iframe></div>';
		var frame_html = '<iframe ' + frame_id + 'src="' + handler + '?' + newQuery + '"' + ((width) ? ' width="' + width + '"' : '') + ((height) ? ' height="' + height + '"' : '') + ' frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" scrolling="no" class="jsmedia ' + placement + '-player" style="vertical-align:middle;"></iframe>';
	}
	$(".hybrid-player").remove();
	$(".hybrid-audio").add(".hybrid-video").show();
	if (placement == "inline" || placement == "hybrid") {
		$(a).hide();
		var obj = $(frame_html);
		$(a).after(obj);
		$(obj).css("cursor","default");
/*		if (script_html) {
			$(obj).before($(script_html));
		}*/
		if (href.indexOf("viddler.com") != -1 && devtest) {
			// Viddler Javascript
			var embed = new ViddlerEmbed({
				videoId: video_id,
				secret: newVars['secret'],
				width: '100%',
				target: '#aw-' + video_id
			});
		}
//		else if (!width_custom && !height_custom) {
		else if (!newVars['fixed']) {
			$(obj).addClass("fluid-video").attr("data-aspect", height / width).css("width","100%");
			$(obj).height(($(obj).width() * $(obj).attr("data-aspect")) + "px");
		}
		if (false && href.indexOf("viddler.com") != -1) {
			var help_html = '<a href="' + href + '" target="_blank" class="jsmedia small block center">Streaming issues? Click here to watch on Viddler.com</a>';
			$(obj).before($(help_html));
		}
		return true; // confirm success
	}
	if (placement == "popup") {
		var h1 = 'AWAI Media Player';
		if (a.title) {
			h1 = a.title;
		}
		var windowid = Math.ceil(Math.random() * 10000);
		var windowwidth = (width * 1) + 60;
		var windowheight = (height * 1) + 200;
		var win = window.open('', windowid, 'width=' + windowwidth + ',height=' + windowheight + ',top=50,left=50,resizable=0,scrollbars=0,titlebar=0,toolbar=0,menubar=0,status=0,directories=0,personalbar=0');
		win.document.write('<body style="background-color:#000; color:#eee;"><div style="text-align:center;">' + '<br />' + '<h1>' + h1 + '</h1>' + /* script_html + */ frame_html + '<br /><br />' + '<a href="javascript:window.close();" style="color:#fff;">close this window</a>' + '</div></body>');
		win.focus(); 
		return true; // confirm success
	}
}


////////////////////////////////////////////////////////////////////////////////
// End Misc. functions                                                        //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Begin jQuery Plugins                                                       //
////////////////////////////////////////////////////////////////////////////////

(function($) {

////////////////////////////////////////////////////////////////////////////////
// jQuery Elastic Textareas

	$.fn.extend({
		elastic: function() {
			var props = ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontSize", "lineHeight", "fontFamily", "fontWeight", "border", "textAlign"];
			return this.each(function() {
				if (this.type != "textarea") { return false; }
				var el = $(this),
					div = $("<div />"),
					lh = parseInt(el.css("line-height"), 10) || parseInt(el.css("font-size"), 10),
					minh = parseInt(el.css("height"), 10) || lh * 3,
					maxh = parseInt(el.css("max-height"), 10) || Number.MAX_VALUE,
					goalh = 0,
					i = props.length;
				if (maxh < 0) { maxh = Number.MAX_VALUE; }
				div.appendTo(el.parent());
				while (i--) {
					div.css(props[i].toString(),el.css(props[i].toString()));
				}
				el.css({overflow: "hidden"});
				div.width(el.width());
				div.css({position:"absolute", display:"none", wordWrap:"break-word", whiteSpace:"pre-wrap"});
//				div.css({display:"block", background:"red"}); // DEBUG
				var update = function() {
					var elcontent = el.val();
					if (elcontent + "." != div.text()) {
						div.text(elcontent + ".");
						if (Math.abs(div.height() + lh - el.height()) > 3) {
							var goalh = div.height() + lh;
							var h = goalh, o = "hidden";
							h = Math.max(minh, Math.min(maxh, h));
							if (goalh >= maxh) { o = "auto"; }
							var y = Math.floor(parseInt(h, 10));
							if (el.height() != y) { el.css({height:y + "px", overflow:o}); }
						}
					}
				}
				el.css({overflow:"hidden"}).bind("keyup change cut input paste", function(e) {
					setTimeout(update, 0);
				});
				update();
			});
        }
    });

////////////////////////////////////////////////////////////////////////////////
// jQuery equalHeights

	$.fn.equalHeights = function() {
		var maxHeight = 0, self = $(this);
		self.each( function() {
			var height = $(this).innerHeight();
			if ( height > maxHeight ) { maxHeight = height; }
		});
		return self.css('height', maxHeight);
	};

////////////////////////////////////////////////////////////////////////////////
// jQuery fitVids

	$.fn.fitVids = function( options ) {
		var settings = {
			customSelector: null,
			ignore: null
		};
		
		if( !document.getElementById('fit-vids-style') ) {
			// appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
			var head = document.head || document.getElementsByTagName('head')[0];
			var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
			var div = document.createElement("div");
			div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
			head.appendChild(div.childNodes[1]);
		}
		
		if ( options ) {
			$.extend( settings, options );
		}
		
		return this.each(function(){
			var selectors = [
				'iframe.jsmedia',
				'object',
				'embed'
			];
			
			if ( settings.customSelector ) {
				selectors.push(settings.customSelector);
			}
			
			var ignoreList = '.fitvidsignore';
			
			if ( settings.ignore ) {
				ignoreList = ignoreList + ', ' + settings.ignore;
			}
			
			var $allVideos = $(this).find(selectors.join(','));
			$allVideos = $allVideos.not('object object'); // SwfObj conflict patch
			$allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.
			
			$allVideos.each(function(count){
				var $this = $(this);
				if( $this.parents(ignoreList).length > 0 ) {
					return; // Disable FitVids on this video.
				}
				if ( this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length ) { return; }
				if ( ( !$this.css('height') && !$this.css('width') ) && ( isNaN($this.attr('height') ) || isNaN($this.attr('width')) ) ) {
					$this.attr('height', 9);
					$this.attr('width', 16);
				}
				var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
				width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
				aspectRatio = height / width;
				if ( !$this.attr('id') ) {
					var videoID = 'fitvid' + count;
					$this.attr('id', videoID);
				}
				$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
				$this.removeAttr('height').removeAttr('width');
			});
		});
	};

////////////////////////////////////////////////////////////////////////////////
// jQuery Timers


	$.fn.extend({
		everyTime: function(interval, label, fn, times) {
			return this.each(function() {
				$.timer.add(this, interval, label, fn, times);
			});
		},
		oneTime: function(interval, label, fn) {
			return this.each(function() {
				$.timer.add(this, interval, label, fn, 1);
			});
		},
		stopTime: function(label, fn) {
			return this.each(function() {
				$.timer.remove(this, label, fn);
			});
		}
	});
	$.extend({
		timer: {
			global: [],
			guid: 1,
			dataKey: "jQuery.timer",
			regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
			powers: {
				// Yeah this is major overkill...
				'ms': 1,
				'cs': 10,
				'ds': 100,
				's': 1000,
				'das': 10000,
				'hs': 100000,
				'ks': 1000000
			},
			timeParse: function(value) {
				if (value == undefined || value == null)
					return null;
				var result = this.regex.exec(jQuery.trim(value.toString()));
				if (result[2]) {
					var num = parseFloat(result[1]);
					var mult = this.powers[result[2]] || 1;
					return num * mult;
				} else {
					return value;
				}
			},
			add: function(element, interval, label, fn, times) {
				var counter = 0;
				if ($.isFunction(label)) {
					if (!times) 
						times = fn;
					fn = label;
					label = interval;
				}
				interval = $.timer.timeParse(interval);
				if (typeof interval != 'number' || isNaN(interval) || interval < 0)
					return;
				if (typeof times != 'number' || isNaN(times) || times < 0) 
					times = 0;
				times = times || 0;
				var timers = $.data(element, this.dataKey) || $.data(element, this.dataKey, {});
				if (!timers[label])
					timers[label] = {};
				fn.timerID = fn.timerID || this.guid++;
				var handler = function() {
					if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
						$.timer.remove(element, label, fn);
				};
				handler.timerID = fn.timerID;
				if (!timers[label][fn.timerID])
					timers[label][fn.timerID] = window.setInterval(handler,interval);
				this.global.push( element );
			},
			remove: function(element, label, fn) {
				var timers = $.data(element, this.dataKey), ret;
				if ( timers ) {
					if (!label) {
						for ( label in timers )
							this.remove(element, label, fn);
					} else if ( timers[label] ) {
						if ( fn ) {
							if ( fn.timerID ) {
								window.clearInterval(timers[label][fn.timerID]);
								delete timers[label][fn.timerID];
							}
						} else {
							for ( var fn in timers[label] ) {
								window.clearInterval(timers[label][fn]);
								delete timers[label][fn];
							}
						}
						for ( ret in timers[label] ) break;
						if ( !ret ) {
							ret = null;
							delete timers[label];
						}
					}
					for ( ret in timers ) break;
					if ( !ret ) 
						$.removeData(element, this.dataKey);
				}
			}
		}
	});
	$(window).bind("unload", function() {
		$.each($.timer.global, function(index, item) {
			$.timer.remove(item);
		});
	});	

////////////////////////////////////////////////////////////////////////////////
// jQuery UI Plugins

////////////////////////////////////////////////////////////////////////////////
// jQuery UI Tabs Extension

	if (typeof($.ui) == "object") {
		
		$.extend( $.ui.tabs.prototype, {
			rotation: null,
			rotationDelay: null,
			continuing: null,
			rotate: function( ms, continuing ) {
				var self = this,
					o = this.options;
	
				if((ms > 1 || self.rotationDelay === null) && ms !== undefined){//only set rotationDelay if this is the first time through or if not immediately moving on from an unpause
					self.rotationDelay = ms;
				}
				if(continuing !== undefined){
					self.continuing = continuing;
				}
				var rotate = self._rotate || ( self._rotate = function( e ) {
					clearTimeout( self.rotation );
					self.rotation = setTimeout(function() {
						var t = o.active;
						self.option( "active",  ++t < self.anchors.length ? t : 0 );
					}, ms );
	
					if ( e ) {
						e.stopPropagation();
					}
				});
				var stop = self._unrotate || ( self._unrotate = !continuing
					? function(e) {
						if (e.clientX) { // in case of a true click
							self.rotate(null);
						}
					}
					: function( e ) {
						t = o.active;
						rotate();
					});
				// start rotation
				if ( ms ) {
					this.element.bind( "tabsactivate", rotate );
					this.anchors.bind( o.event + ".tabs", $.proxy(self.unpause, self) );
					rotate();
				// stop rotation
				} else {
					clearTimeout( self.rotation );
					this.element.unbind( "tabsactivate", rotate );
					this.anchors.unbind( o.event + ".tabs", $.proxy(self.pause, self) );
					delete this._rotate;
					delete this._unrotate;
				}
				//rotate immediately and then have normal rotation delay
				if(ms === 1){
					//set ms back to what it was originally set to
					ms = self.rotationDelay;
				}
				return this;
			},
			pause: function() {
				var self = this,
					o = this.options;
				self.rotate(0);
			},
			unpause: function(){
				var self = this,
					o = this.options;
				self.rotate(1, self.continuing);
			}
		});
		
		$.extend($.ui.tabs.prototype, {
			fit: function(equal, pass) {
				var self = this;
				var fit = self._fit || (self._fit = function() {
//					var ul = self.list, a = self.anchors, li = self.lis,  n = li.length,
					var ul = self.tablist, a = self.anchors, li = ul.children( ":has(a[href])" ),
						n = li.length,
						s = {pl:"padding-left", pr:"padding-right", bl:"border-left-width", br:"border-right-width", ml:"margin-left", mr:"margin-right"};
					if ((!$(li[0]).innerWidth() || $(li[0]).innerWidth() < 0) && (!pass || pass < 6)) {
						ul.css("box-sizing", "content-box");
						$(self).oneTime(150, function() { fit(equal, (pass || 0) + 1) });
						return {};
					}
					var pad = c(ul, s.pl) + c(ul, s.pr);
					$(li[n - 1]).css(s.mr, 0);
					a.css(s.pl, 0).css(s.pr, 0).css("text-align", "center");
					for (var i = awt = mrp = 0, aw = []; i < n; awt += aw[i], i++) {
						for (var j = 0, e = [], el = [$(li[i]), $(a[i])]; j <= 1; j++) {
							for (var k in s) { e[k] = c(el[j], s[k]); }
							pad += e.bl + e.br;
							if (j == 0) { pad += Math.max(mrp, e.ml); mrp = e.mr; }
							else { pad += e.ml + e.mr; aw[i] = el[j].innerWidth(); }
						}
					}
					var x = (ul.innerWidth() - pad - ((equal) ? 0 : awt) - 1); // Adding "-1" due to rounding bug in certain cases with higher DPI or zoom
					var y = Math.floor(x / n), z = x % n;
					for (var i = 0; i < n; i++) {
						$(a[i]).width(y + ((equal) ? 0 : aw[i]) + ((z > i) ? 1 : 0));
						$(li[i]).css("list-style", "none"); // IE Hack
					}
				});
				var c = (function(el, p) {
					var v = Math.round(el.css(p).replace("px","")) || 0; el.css(p, v); return v;
				});
				fit();
				$(window).resize(fit);
//				$(".accordion").children("h2, .accordion-header").click(fit);
//				$(self.tablist).parents(".accordion").find("h2, .accordion-header").click(function() { fit(equal) });
			}
		});

/*		$.extend($.ui.tabs.prototype, {
			fit: function(equal) {
				var self = this;
				var pass = 0;
				var fit = self._fit || (self._fit = function(equal, pass) {
//					var ul = self.list, a = self.anchors, li = self.lis,  n = li.length,
					var ul = self.tablist, a = self.anchors, li = ul.children( ":has(a[href])" ),
						n = li.length,
						s = {pl:"padding-left", pr:"padding-right", bl:"border-left-width", br:"border-right-width", ml:"margin-left", mr:"margin-right"};
					ul.css("box-sizing", "content-box");
					if (!$(li[0]).innerWidth()) {
						if (!pass || pass < 30) {
							$(self).stopTime("tabs_fit").oneTime(100, "tabs_fit", function() { fit(equal, ((pass) ? ++pass : 1)) });
						}
						return {};
					}
					var pad = c(ul, s.pl) + c(ul, s.pr);
					$(li[n - 1]).css(s.mr, 0);
					a.css(s.pl, 0).css(s.pr, 0).css("text-align", "center");
					for (var i = awt = mrp = 0, aw = []; i < n; awt += aw[i], i++) {
						for (var j = 0, e = [], el = [$(li[i]), $(a[i])]; j <= 1; j++) {
							for (var k in s) { e[k] = c(el[j], s[k]); }
							pad += e.bl + e.br;
							if (j == 0) { pad += Math.max(mrp, e.ml); mrp = e.mr; }
							else { pad += e.ml + e.mr; aw[i] = el[j].innerWidth(); }
						}
					}
					var x = (ul.width() - pad - ((equal) ? 0 : awt));
					var y = Math.floor(x / n), z = x % n;
					for (var i = 0, p = 0; i < n; i++) {
						$(a[i]).width(y + ((equal) ? 0 : aw[i]) + ((z > i) ? 1 : 0));
//						p = y + ((z > i) ? 1 : 0);
//						$(a[i]).css(s.pl, (p / 2));
//						$(a[i]).css(s.pr, (p - c($(a[i]), s.pl)));
						$(li[i]).css("list-style", "none"); // IE Hack
					}
				});
				var c = (function(el, p) {
					var v = Math.round(el.css(p).replace("px","")) || 0; el.css(p, v); return v;
				});
				fit(equal);
//				$(window).on("resize", fit);
				var resizeTimer;
				var didResize;
				$(window).on("resize", function() {
					if (!didResize) {
						didResize = true;
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function() {
							fit(equal);
							didResize = false;
						}, 250);
					}
				});
			}
		});*/

////////////////////////////////////////////////////////////////////////////////
// jQuery UI Accordion Fix

		$.extend( $.ui.accordion.prototype, {
			_processPanels: function() { // jquery-ui-1.12.1
				var prevHeaders = this.headers,
					prevPanels = this.panels;
		
//				this.headers = this.element.find( this.options.header );
				this.headers = this.element.children( this.options.header ); // Skip headers in nested accordions. We may need a different way, there may be cases where only allowing direct children of the accordion element is not desirable. JT - 2017-11-28
//				this.headers = this.element.find( this.options.header ).not( this.element.find( ".accordion" ).find( this.options.header ) ); // Alternate method, but this one only works when using the arbitrary class "accordion" and may still grab extra headers, such as inside nested "ui-tabs".
				this._addClass( this.headers, "ui-accordion-header ui-accordion-header-collapsed",
					"ui-state-default" );
		
				this.panels = this.headers.next().filter( ":not(.ui-accordion-content-active)" ).hide();
				this._addClass( this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content" );
		
				// Avoid memory leaks (#10056)
				if ( prevPanels ) {
					this._off( prevHeaders.not( this.headers ) );
					this._off( prevPanels.not( this.panels ) );
				}
			}
		});
	}


})(jQuery);

////////////////////////////////////////////////////////////////////////////////
// End jQuery Plugins                                                         //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Call page load functions                                                   //
////////////////////////////////////////////////////////////////////////////////

$(function() {
	if ($("a[href*=devtest]").length) {
		$.getScript("https://static.cdn-ec.viddler.com/js/arpeggio/v3/build/main-built.js").always(function() {
			class_init(document);
		});
	}
	else {
		class_init(document);
	}
	print_date();
	$("div.expandable").each(function() {
		$(this).data("ref-height", $(this).height());
		$(this).hide().css({ height:0 });
	});
	$("form .input-note").hide();
	$(".countries").each(function() {
		getStates($(this), false);
	});
	$(window).load(function() {
		$(".eq-children").each(function() {
			$(this).children().equalHeights();
		});
	});
	$(window).load(function() {
		$(".eq-container").each(function() {
			$(this).find(".eq-item").equalHeights();
		});
	});
	$(window).resize(function() {
		$(".fluid-video").each(function() {
			if ($(this).attr("data-aspect")) {
				$(this).height(($(this).width() * $(this).attr("data-aspect")) + "px");
			}
		});
	});


/*	$(window).unload(function() {
		$("*").unbind();
		var html = document.getElementsByTagName("body");
		for (var i = 0; i < html.length; ++i) {
			removeChildSafe(html[i]);
		}
		html = null;
		function removeChildSafe(el) {
			//before deleting el, recursively delete all of its children.
			while (el.childNodes.length > 0) {
				removeChildSafe(el.childNodes[el.childNodes.length - 1]);
			}
			el.parentNode.removeChild(el);
			discardElement(el);
		}
		function discardElement(el) {
			var bin = document.getElementById("IELeakGarbageBin");
			if (!bin) {
				bin = document.createElement("DIV");
				bin.id = "IELeakGarbageBin";
				document.body.appendChild(bin);
			}
			bin.appendChild(el);
			bin.innerHTML = "";
		}
	});*/
});

////////////////////////////////////////////////////////////////////////////////
// Handle scrolling tabs after tabs are loaded                                //
////////////////////////////////////////////////////////////////////////////////

$(function() {

	var getScrollMax = function(scrolledNav) {
		
		var scrollMax = 0;
		scrolledNav.css("box-sizing", "border-box");
		scrolledNav.children('li').each( function(){ scrollMax += $(this).outerWidth(); });
		scrollMax = Math.max(0, scrollMax - scrolledNav.width());
		
		return scrollMax;
		
	}
		
	var getScrollBuffer = function() {
		
		/* Adding a slight buffer to start/end scroll areas */
		var scrollBuffer = 20;
		
		return scrollBuffer;
		
	}
		
	var toggleScrollArrows = function(scrolledNav, manual) {
		
		var scrollMax = getScrollMax(scrolledNav);
		
		if (!manual) {
			var activeTabOffset = 0;
			scrolledNav.children('.ui-tabs-active').prevAll().each(function() {
				activeTabOffset += $(this).width();
				//.position().left;
			});
			scrolledNav.animate({scrollLeft: activeTabOffset - ((scrolledNav.width() - scrolledNav.children('.ui-tabs-active').width()) / 2)}, 200);
		}

		if (scrollMax) {
			if (scrolledNav.scrollLeft() > getScrollBuffer()) {
				scrolledNav.siblings('.ui-tabs-scroll-left').fadeIn('fast');
			} else {
				scrolledNav.siblings('.ui-tabs-scroll-left').fadeOut('fast');
			}
	
			if (scrolledNav.scrollLeft() < scrollMax - getScrollBuffer()) {
				scrolledNav.siblings('.ui-tabs-scroll-right').fadeIn('fast');
			} else {
				scrolledNav.siblings('.ui-tabs-scroll-right').fadeOut('fast');
			}
		}
		
	}
	
	var scrollUItabsLeft = function(scrolledNav) {
		var left = scrolledNav.scrollLeft() - (scrolledNav.width() / 2);
		if (left < getScrollBuffer()) left = 0;
		/* Scroll about one viewport width's worth of scrolling to the left, animated */
		scrolledNav.animate({ scrollLeft: left }, 500);
	}
	
	var scrollUItabsRight = function(scrolledNav) {
		var scrollMax = getScrollMax(scrolledNav);
		var left = scrolledNav.scrollLeft() + (scrolledNav.width() / 2);
		if (left > scrollMax - getScrollBuffer()) left = scrollMax;
		/* Scroll about one viewport width's worth of scrolling to the right, animated */
		scrolledNav.animate({ scrollLeft: left }, 500);
	}

	var uiTabs = $('.ui-tabs-nav');

	/* Adding our neccesary HTML to all jQuery UI Tabs */
	var navWrapperHTML = '<nav class="ui-tabs-nav-wrapper"></nav>';
		uiTabsScrollLeftHTML = '<a class="ui-tabs-scroll-left fa fa-arrow-left"><span class="hidden-a11y">Scroll Tabs Left</span></a>';
		uiTabsScrollRightHTML = '<a class="ui-tabs-scroll-right fa fa-arrow-right"><span class="hidden-a11y">Scroll Tabs Right</span></a>';
		
	uiTabs.wrap(navWrapperHTML);
	$(uiTabsScrollLeftHTML).prependTo('nav.ui-tabs-nav-wrapper').hide();
	$(uiTabsScrollRightHTML).appendTo('nav.ui-tabs-nav-wrapper').hide();
	
	/* Our listners to add click and scroll functionality to arrows */
	$('.ui-tabs-scroll-left').on('click', function() {
		scrollUItabsLeft($(this).siblings('.ui-tabs-nav'));
	});
	
	$('.ui-tabs-scroll-right').on('click', function() {
		scrollUItabsRight($(this).siblings('.ui-tabs-nav'));
	});

	/* Our listner to fade the left and right arrows out as needed  */
	uiTabs.each(function() {
		var scrolledNav = $(this);
		var scrollTimer;
		var didScroll;
		
		/* Making sure we run this to setup our arrows the right way on page ready */
		toggleScrollArrows(scrolledNav);
		
		scrolledNav.on('scroll', function() {
			if (!didScroll) {
				didScroll = true;
				clearTimeout(scrollTimer);
				scrollTimer = setTimeout(function() {
					toggleScrollArrows(scrolledNav, true);
					didScroll = false;
				}, 250);
			}
		});
		
	});

	var resizeTimer;
	
	$(window).on('resize', function(e) {
		/*
		Adding debouncing to the resize event, otherwise it fires way too often.
		Source: https://css-tricks.com/snippets/jquery/done-resizing-event/
		*/
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			toggleScrollArrows(uiTabs);
		}, 250);
	});
	
	$('.tabs-jump').click(function() {
		toggleScrollArrows(uiTabs);
	});

});
