
jQuery(document).ready(function ($) {

  // Add some classes to body for CSS hooks
    // Get browser
    $.each($.browser, function(i) {
        $('body').addClass(i);
        return false;  
    });

    // Get OS
    var os = [
        'iphone',
        'ipad',
        'android',
        'windows'
//        'mac',
//        'safari',
//        'linux'
    ];

    var match = navigator.appVersion.toLowerCase().match(new RegExp(os.join('|')));
    if (match) {
      $('body').addClass(match[0]);
    };

  // Set external urls to open in new windows
  $("a[href*='http']").each(function() {
    $(this).attr("target","_blank");
    $(this).attr("class","external");
  });

  // Handle urls in apps
  if ( $("body").hasClass("android") || $("body").hasClass("iphone") || $("body").hasClass("ipad") ) {

    // Ensure local urls open in broswers in apps
    $('a').not('.external, .fblink').each(function() {
      $(this).click(function(){
        window.location=$(this).attr("href")+'#mobileRedirect';
        event.preventDefault();
      });
    });

  }

  // On iOS / Android attempt to open FB url in App
  if ( $("body").hasClass("android") || $("body").hasClass("iphone") || $("body").hasClass("ipad") ) {

    // Add a reference to the Facebook page
    // ala http://wiki.akosma.com/IPhone_URL_Schemes#Facebook
    $("a[href*='www.facebook.com/bahnsharing']").each(function() {
      $(this).attr("data-scheme","fb://profile/540486946021101");
      $(this).addClass('fblink');
      //remove external target
      $(this).attr("target","");
    });

    // Open bahn links in Safari
    $("a[href*='www.bahn.de']").each(function() {
      //$(this).attr("data-scheme","fb://profile/540486946021101");
      $(this).addClass('safarilink');
    });

  }

  $("a.safarilink").click(function(){
    // inspiration from
    // http://stackoverflow.com/questions/7930001/force-link-to-open-in-mobile-safari-from-a-web-app-with-javascript

    var aDestination = document.createElement('a');

    aDestination.setAttribute("href", this.getAttribute("href"));
    aDestination.setAttribute("target", "_blank");

    var dispatch = document.createEvent("HTMLEvents");
    dispatch.initEvent("click", true, true);
    aDestination.dispatchEvent(dispatch);

    event.preventDefault();
  });

  $("a.fblink").click(function(){
    goToUri($(this).data('scheme'), $(this).attr('href'));
    event.preventDefault();
  });

  // Ensure other external urls open in broswers in apps
  $('a.external').click(function() {
    //window.open($(this).attr("href"), '_system');
    navigator.app.loadUrl($(this).attr("href"), { openExternal:true });
    event.preventDefault();
  });

  // tries to execute the uri:scheme
  // via http://stackoverflow.com/questions/13675535/how-to-launch-apps-facebook-twitter-etc-from-mobile-browser-but-fall-back-to-h
  function goToUri(uri, href) {
      var start, end, elapsed;

      // start a timer
      start = new Date().getTime();

      // attempt to redirect to the uri:scheme
      // the lovely thing about javascript is that it's single threadded.
      // if this WORKS, it'll stutter for a split second, causing the timer to be off
      document.location = uri;

      // end timer
      end = new Date().getTime();

      elapsed = (end - start);

      // if there's no elapsed time, then the scheme didn't fire, and we head to the url.
      if (elapsed < 1) {
          navigator.app.loadUrl(href, { openExternal:true });
          document.location = href;
      }
  }


  // Debugging
  //console.log($('body').attr('class'));

  $('#mobileLinkDebug').html($('body').attr('class') + ' detected');

//  $('#mobileLinkDebug').html($('body').attr('class') + ' AND ' + navigator.appVersion.toLowerCase() + ' AND URL: ' + document.URL);


});