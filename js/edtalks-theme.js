(function ($, Drupal, drupalSettings) {

    'use strict';
  
    Drupal.behaviors.visualScripts = {
      attach: function (context, settings) {

        // use select element label as option heading
        $('.form-type-select').each(function(){
          var selectLabel = $(".control-label", this);
          var selectEl = $(".select-wrapper > select", this);
          $(selectEl).once().prepend(`<option disabled>${selectLabel.text()}</option>`);
          $(selectLabel).css("display", "none");
        });

        // count and display number of presenters if more than 1
        $(".card-authors").each(function() {
          var numPresenters = $("ul > li", this).length;
          if (numPresenters > 1) {
            $("li:first-of-type", this).once().text(`${numPresenters} Presenters`)
          }
        });

        // offcanvas menu
        $('button.navbar-toggle[data-toggle="offcanvas"]').click(function() {
          var targetEl = $(this).attr("data-target");
          if ($(targetEl).hasClass("is-open")) {
            $(targetEl)
              .removeClass("is-open")
              .css("left", "-82%");
              $("#off-canvas-overlay").css("display", "none");
          } else {
            $(targetEl)
              .addClass("is-open")
              .css("left", "0%");
            $("#off-canvas-overlay").css("display", "block");
          }
        });
        $('#off-canvas-overlay').click(function() {
          $('#navbar-offcanvas.is-open').removeClass("is-open").css("left", "-82%");
          $(this).css("display", "none");
        });

        // better looking event date output
        $('.event-compare-dates').each(function() {
          //var eventYear = $('time:first-of-type').text().split(",")[1];

          var startDate = $('time:first-of-type');
          var endDate = $('time:last-of-type');
//          console.log(eventYear);

          // compare start and end to see if they match
          if ( $(startDate).text() === $(endDate).text() ) {
            $(endDate).css('display', 'none');
          } else {
            var splitStartText = $(startDate).text().split(',');
            var splitEndText = $(endDate).text().split(' ');
            var newDateText = splitStartText[0] + ' - ' + splitEndText[1] + splitStartText[1];
            $(startDate).text(newDateText);
            $(endDate).css('display', 'none');
           }
        });


      }
    }

})(jQuery, Drupal, drupalSettings);