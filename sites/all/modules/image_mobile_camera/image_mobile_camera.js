/**
 * Run a snippet of JS on page load.
 */
(function ($) {
  Drupal.behaviors.image_mobile_camera = {
    attach: function (context, settings) {
      // Process form image widgets.
      $('div.image-widget-data input[type="file"]').each(function(idx, item) {
        $(item).attr('accept', 'image/*;capture=camera');
      });
    }
  }
})(jQuery);
