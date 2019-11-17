(function ($, Drupal, drupalSettings) {

    'use strict';
  
    Drupal.behaviors.visualScripts = {
      attach: function (context, settings) {

        // use select element label as option heading
        $('.form-type-select').each(function(){
          var selectLabel = $(".control-label", this);
          var selectEl = $(".select-wrapper > select", this);
          $(selectEl).prepend(`<option disabled>${selectLabel.text()}</option>`);
          //$(selectEl).wrapInner(`<optgroup label="${selectLabel.text()}"></optgroup>`);
          $(selectLabel).css("display", "none");
        });


      }
    }

})(jQuery, Drupal, drupalSettings);