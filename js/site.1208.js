/*$.preloadImages(
	"/_img/framework/templates/default/myawai_menu.png"
);*/


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Begin Page load functions                                                  //
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function site_class_init(context) {

    /*
        $(".sidebar .jsfill", context).each(function(index) {
            var y = $(document).height();
            $(this).show();
            if ($(document).height() > y) {
                $(this).hide();
                return false;
            }
        });
        
        $("div.myawaibutton a, div.qm-button a", context).mouseenter(function(){
            if (!$(this).hasClass("menuopen")) {
                $(this).oneTime(50, function() {
                    myawaimenu_show();
                });
            }
        }).mouseleave(function() {
            $(this).stopTime();
        }).click(function(){
            if (!$(this).hasClass("menuopen")) {
                myawaimenu_show();
            }
            else {
                $("div.myawaimenu").slideUp(300, function() { $("div.myawaibutton a, div.qm-button a").removeClass("menuopen"); });
            }
            this.blur();
            return false;
        });
        $("div.myawaimenu", context).mouseenter(function(e){
            $(document).stopTime("myawaimenu_hide");
        }).mouseleave(function(e){
            if (e.pageY > $(this).offset().top) {
                $(document).oneTime(400, "myawaimenu_hide", function() { $("div.myawaimenu").slideUp(300, function() { $("div.myawaibutton a, div.qm-button a").removeClass("menuopen"); }) });
            }
        });
    */
            
        $(".continue-reading", context).click(function() {
            var t = $(this), p = t.parent(), a = p.height(), b = p.css("height", "auto").outerHeight();
            p.height(a);
            p.animate({height: b}, (b - a) * 2, function() {
                t.hide();
                p.css("height", "auto");
            });
        });
        
        $("ul.unit-rating li a", context).mouseenter(function() {
            $(this).parents("ul.unit-rating").children("li.current-rating").hide();
        }).mouseleave(function() {
            $(this).parents("ul.unit-rating").children("li.current-rating").show();
        });
        
        $("a.rater", context).click(function() {
            var theDIV = $(this).parents("div.ratingblock"); // the DIV
            var theUL = $(this).parents("ul.unit-rating");  // the UL
            // show a loading image
            theUL.html('<li class="loading">loading</li>');
            theUL[0] = null;
            var div = $("<div></div>");
            div.load($(this).attr("href")+"&lp_ajax=1", null, function() {
                theDIV.empty().replaceWith(div);
                theDIV[0] = null;
            });
            return false;		
        });
        
        $("a.ajax-replace", context).click(function() {
            var el = this;
            var h = $(el).attr("href");
            h += ((h.indexOf("?") >= 0) ? "&" : "?") + "lp_ajax=1";
            // show a loading image
            var loader = $('<span class="loading">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
            $(el).empty().replaceWith(loader);
            el = null;
            var result = $("<span></span>");
            result.load(h, null, function() {
                loader.empty().replaceWith(result);
                loader[0] = null;
                class_init(result);
                site_class_init(result);
            });
            return false;		
        });
        
        /* Helper script for text inputs, to add/remove js-focus, js-blank, and js-valid/js-invalid classes. */
        $("input[type!='hidden']", context).each(function() {
            var el = $(this);
            var v = (function() {
                if (el.val()) {
                    el.removeClass("js-blank");
                } else {
                    el.addClass("js-blank");
                }
                if (el[0].validity.valid) { // https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
                    el.addClass("js-valid");
                    el.removeClass("js-invalid");
                } else {
                    el.addClass("js-invalid");
                    el.removeClass("js-valid");
                }
            });
            
            if (el.val()) {
                v();
            } else {
                el.addClass("js-blank");
            }
            
            el.on("focus", function() {
                el.addClass("js-focus");
                if (el.hasClass("js-invalid")) {
                    v();
                }
            }).on("blur", function() {
                el.removeClass("js-focus");
                v();
            }).on("keyup", function() {
                if (el.hasClass("js-invalid")) {
                    v();
                }
            }).on("invalid", function() {
                v();
            });
        });
        
        $('.tweet-this', context).each(function () {
            // IMPORTANT: 234 character limit.
            let userInput = $(this).text().trim().replace(/\s+/g, ' ');
            let restOfTweet = 46;
            let totalLength = userInput.length + restOfTweet;
    
            if (totalLength > 280) {
                userInput = userInput.substring(0, 277 - restOfTweet); // Minus 3 for ellipses.
                userInput =
                    userInput.substring(0, userInput.lastIndexOf(' ')) + '...';
    
                // Prevents "...."
                if (userInput.charAt(userInput.length - 4) === '.') {
                    userInput = userInput.slice(0, userInput.length - 1);
                }
            }
    
            const pageLink = encodeURIComponent(
                location.protocol + '//' + location.host + location.pathname,
            );
            const encodedInput = encodeURIComponent(userInput);
            const title = 'Tweet this.';
            const tweetURL = `https://twitter.com/intent/tweet?text=${encodedInput}&via=AWAIcopywriting&related=AWAIcopywriting&url=${pageLink}`;
    
            let textLink = $(document.createElement('a'))
                .attr('href', tweetURL)
                .attr('title', title)
                .addClass('tweet-this-text');
    
            let twitterLogo = $(document.createElement('img'))
                .attr('src', '/_img/toolbox/logos/social/twitter_logo-blue.png')
                .addClass('twitter-logo');
    
            let twitterShareLink = $(document.createElement('a'))
                .attr('href', tweetURL)
                .attr('title', title)
                .addClass('twitter-share-link')
                .text('Click to Tweet')
                .append(twitterLogo);
    
            $(this).wrapInner(textLink).append(twitterShareLink);
        });
    
    }
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    // End Page load functions                                                    //
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    // Begin Misc. functions                                                      //
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    
    
    const add_tweet_click_listener = () => {
        if (window.__twitterIntentHandler) return;
        var intentRegex = /twitter\.com\/intent\/(\w+)/,
            windowOptions =
                'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
            width = 550,
            height = 420,
            winHeight = screen.height,
            winWidth = screen.width;
    
        function handleIntent(e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                m,
                left,
                top;
    
            while (target && target.nodeName.toLowerCase() !== 'a') {
                target = target.parentNode;
            }
    
            if (
                target &&
                target.nodeName.toLowerCase() === 'a' &&
                target.href
            ) {
                m = target.href.match(intentRegex);
                if (m) {
                    left = Math.round(winWidth / 2 - width / 2);
                    top = 0;
    
                    if (winHeight > height) {
                        top = Math.round(winHeight / 2 - height / 2);
                    }
    
                    window.open(
                        target.href,
                        'intent',
                        windowOptions +
                            ',width=' +
                            width +
                            ',height=' +
                            height +
                            ',left=' +
                            left +
                            ',top=' +
                            top,
                    );
                    e.returnValue = false;
                    e.preventDefault && e.preventDefault();
                }
            }
        }
    
        if (document.addEventListener) {
            document.addEventListener('click', handleIntent, false);
        } else if (document.attachEvent) {
            document.attachEvent('onclick', handleIntent);
        }
        window.__twitterIntentHandler = true;
    };
    
    /*
    function myawaimenu_show() {
        $("div.myawaibutton a, div.qm-button a").addClass("menuopen");
        $("div.myawaimenu").slideDown(300, function() {
            if (!$("div.masthead").hasClass("loggedin")) {
                var el = $("input#myawaimenu-username");
                if (el.val()) { el = $("input#myawaimenu-password"); }
                el.focus();
                el = null;
            }
        });
    }
    */
    
    /*
    function ticker_init( ticker_id, delay ) {
        var id = "#" + ticker_id + "-ticker";
        delay = (delay) ? delay : 1;
        $(document).oneTime(delay, function() {
            $(id+" li").first().each(function(i, el) {
                $(el).fadeOut(1000, function() {
                    el = null;
                    id.innerHTML = "";
                    $(id).load("/toolbox/ticker/" + ticker_id + ".php?date=" + new Date().toJSON().split("T")[0], null, function() { // Cache for 1 day, Use .getTime for no cache
                        $(id+" li")
                            .css({display: "none", cursor: "pointer"})
                            .hover(function() {
    //							$(this).stop(true).stopTime().fadeTo(0, 1);
                                $(id).stopTime();
                                $(this).stop(true).fadeTo(0, 1);
                            }, function() {
    //							$(this).oneTime(3000, function() { ticker_tick(ticker_id); });
                                $(id).stopTime().oneTime(3000, function() { ticker_tick(ticker_id); });
                            })
                            .click(function() {
                                window.location = $(this).find("a").attr("href");
                                return false;
                            })
                            .eq(0).fadeIn(500, function() {
                                $(id).stopTime().oneTime(5000, function() { ticker_tick(ticker_id); });
                            });
                    });
                });
            });
        });
    }
    
    function ticker_tick( ticker_id ) {
        var id = "#" + ticker_id + "-ticker";
        $(id+" li").first().each(function(i, el) {
            $(el).fadeOut(1000, function() {
                $(el).appendTo(id);
                el = null;
                $(id+" li").eq(0).fadeIn(500, function() {
                    $(id).oneTime(5000, function() { ticker_tick(ticker_id); });
                });
            });
        });
    }
    */
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    // End Misc. functions                                                        //
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    // Call page load functions                                                   //
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    
    $(function() {
        site_class_init(document);
    //	ticker_init("news", 10);
        add_tweet_click_listener();
    });
    