(function ($, Drupal, drupalSettings) {

    'use strict';
  
    Drupal.behaviors.visualScripts = {
      attach: function (context, settings) {

        // use select element label as option heading
        $('.form-type-select').each(function(){
          var selectLabel = $(".control-label", this);
          var selectEl = $(".select-wrapper > select", this);
          $(selectEl).once().prepend(`<option disabled>${selectLabel.text()}</option>`);
          //$(selectEl).wrapInner(`<optgroup label="${selectLabel.text()}"></optgroup>`);
          $(selectLabel).css("display", "none");
        });

        // count and display number of presenters if more than 1
        $(".card-authors").each(function() {
          var numPresenters = $("ul > li", this).length;
          if (numPresenters > 1) {
            $("li:first-of-type", this).once().append(` +${numPresenters - 1}`)
          }
        });

        // offcanvas menu
        $('[data-toggle="offcanvas"]').click(function() {
          var targetEl = $(this).attr("data-target");
          if ($(targetEl).hasClass("is-open")) {
            console.log("open already");
            $(targetEl)
              .removeClass("is-open")
              .css("left", "-80%");
          } else {
            $(targetEl)
              .addClass("is-open")
              .css("left", "0%");
          }
        });


      }
    }

})(jQuery, Drupal, drupalSettings);