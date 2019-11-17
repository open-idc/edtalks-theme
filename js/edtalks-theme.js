(function ($, Drupal, drupalSettings) {

    'use strict';
  
    Drupal.behaviors.visualScripts = {
      attach: function (context, settings) {

        // use select element label as option heading
        $('.form-type-select').each(function(){
          var selectLabel = $('.control-label', this).text().css('display','none');
          var selectEl = $('.select-wrapper > select', this);
          $(selectEl).innerWrap(`<optgroup label="${selectLabel}></optgroup>`)
        });


      }
    }

})(jQuery, Drupal, drupalSettings);