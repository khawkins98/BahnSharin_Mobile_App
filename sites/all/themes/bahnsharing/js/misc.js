/* custom js to do misc things
   Ken Hawkins 20131114 */

jQuery(document).ready(function($) {
  
  // Scroll down 1px to hide nav on mobile devices
  // window.addEventListener("load",function() {
  //   // Set a timeout...
  //   setTimeout(function(){
  //     // Hide the address bar!
  //     window.scrollTo(0, 1);
  //   }, 0);
  // });


  // If screen is tall enough, do some things
  windowHeight = $(window).height();
  windowWidth = $(window).width();

  // add more padding to homepage
  if (windowHeight > 450) {
    $('.front-login.facebook').css('margin-bottom', '2em');
  }


  // Clear various input fields on select
  // This helps so numbers don't need to be manually cleared
  // like with the free seats, or date compatibility for various formats
  $("#edit-seats").click(function() { $(this).val(''); });
  $("body.android #edit-departuretime-value-datepicker-popup-0").click(function() { $(this).val(''); });
  $("body.android #edit-departuretime-value-timeEntry-popup-1").click(function() { $(this).val(''); });

  // Hide the notes help text on text input
  $("textarea#edit-field-notes-und-0-value").click(function() { $('#field-notes-add-more-wrapper .help-block').hide(); });


  /* REMOVED

  // Show train details on button click
  $(".traindetailsbutton").click(function() {
      $(".traindetails").slideToggle( "slow", function() {
        // Animation complete.
       return false;
      });
  });

  */

  // $('.select2-drop-mask').click(function () { 
  //   $("#edit-departure-distance-origin-latlon").select2("close"); 
  //   console.log('test');
  // });

  // ---- FastClick to remove 300ms delay from silly mobile browsers
  $(function() {
    FastClick.attach(document.body);
  });

  // only add the nice scroll bars for desktop sized screens
  if (windowHeight > 700) {
    $(function() {
      $('.mobilewrapper').perfectScrollbar();
    });
  }



  
});