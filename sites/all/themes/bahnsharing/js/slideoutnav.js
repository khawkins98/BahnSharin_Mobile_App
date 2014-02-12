/* custom js to help slide out menu work
   kh 20130911 */

jQuery(document).ready(function($) {
  
  //$('body').addClass('js');
  
  var $menulink = $('.btn-navbar'),
    $navbar = $('#navbar'),
    $wrap = $('#side-menu'),
    $wrapshadow = $('#side-menu-shadow');
  
  $menulink.click(function() {
    // http://www.greensock.com/css3/
    // TweenLite.to("#side-menu", 0.5, {left:0, 
    //  boxShadow:"400px 400px 0px 400px rgb(0, 0, 0, 0.4)"
    // });
    // If the menu is already open, close it
    // TweenLite.to("#side-menu.active", 0.4, {left:"-10em", 
    //  boxShadow:"0px 0px 400px 0px rgb(0, 0, 0, 0.0)"
    // });

    $navbar.toggleClass('active');
    $menulink.toggleClass('active');
    $wrap.toggleClass('active');
    $wrapshadow.toggleClass('active');
    return false;
  });

  // hide the menu when a user selects a link
  $('.menu.nav a').click(function() {
    $navbar.toggleClass('active');
    $menulink.toggleClass('active');
    $wrap.toggleClass('active');
    $wrapshadow.toggleClass('active');
    // TweenLite.to("#side-menu", 0.1, {left:"-10em"});
  });


  //add the back link target
  var referrer =  document.referrer;
  $('a.backbutton').attr('href', referrer);


});