jQuery(document).ready(function($) {

  // Mobile transition simulation
  $(document).ready(function() {

  	$(this).find(".main-container").each(function(){
      $(this).addClass("active transition");
      $('.spinner-css').toggle();
  	})

    $(".form-submit").click(function(event){
//      event.preventDefault();
      $('.spinner-css').toggle();
      $(".main-container").addClass("out").delay(15500).queue(function(next){
        $(this).removeClass("out");
        $('.spinner-css').css("display","none");
        next();
      });      
//      linkLocation = this.href;
//      redirectPage(); 
    });
         
    $(".page-transition").click(function(event){
      $('.spinner-css').toggle();
      $(".main-container").addClass("out").delay(9000).queue(function(next){
        $(this).removeClass("out");
        $('.spinner-css').css("display","none");
        next();
      });      
    });

    $(".menu.nav a").click(function(event){
      $('.spinner-css').toggle();
      $(".main-container").addClass("out").delay(9000).queue(function(next){
        $(this).removeClass("out");
        $('.spinner-css').css("display","none");
        next();
      });      
    });

    // always show ride create page
    $('.page-ride-create').removeClass("out");

    function redirectPage() {
      window.location = linkLocation;
    }

  });


});

