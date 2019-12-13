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
      $('button.navbar-toggle[data-toggle="offcanvas"]').click(function(e) {
        e.preventDefault();
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
        
        var startDate = $('time:first-of-type', this);
        var endDate = $('time:last-of-type', this);
        var splitStartText = $(startDate).text().split(' ');
        var splitEndText = $(endDate).text().split(' ');
        var newDateText;

        // compare start and end to see if they match
        if ( $(startDate).text() === $(endDate).text() ) {
          $(endDate).css('display', 'none');
        } else if ( (splitStartText[0] !== splitEndText[0]) && (splitStartText[2] === splitEndText[2]) ) {
          newDateText = splitStartText[0] +  ' ' + splitStartText[1] + ' - ' + splitEndText[0] + ' ' + splitEndText[1] + ', ' + splitEndText[2];
          $(startDate).text(newDateText);
          $(endDate).css('display', 'none');
        } else if ( (splitStartText[0] === splitEndText[0]) && (splitStartText[1] !== splitEndText[1]) ) {
          newDateText = splitStartText[0] + ' ' + splitStartText[1] + ' - ' + splitEndText[1] + ', ' + splitEndText[2];
          $(startDate).text(newDateText);
          $(endDate).css('display', 'none');
        } else {
            $(startDate).once().append(' - ');
        }
      });

      // enable readmore.js
      $('.is-readmore').readmore({
        collapsedHeight: 125,
        moreLink: '<a href="#">Expand</a>',
        lessLink: '<a href="#">Close</a>'
      });


      // display website url on profile better
      $('a.get-website-url').each(function() {
        var dataURI = $(this).text().split('://');
        $(this).text(dataURI[1]);
      });

      // display twitter url on profile better
      $('a.get-twitter-url').each(function() {
        var dataURI = $(this).text().split('twitter.com/');
        $(this).text('@' + dataURI[1]);
      });



    }
  }

  Drupal.behaviors.socialShare = {
    attach: function (context, settings) {

      // store popup window options
      var getWindowOptions = function() {
        var width = 450;
        var height = 450;
        var left = (window.innerWidth / 2) - (width / 2);
        var top = (window.innerHeight / 2) - (height / 2);
      
        return [
          'resizable,scrollbars,status',
          'height=' + height,
          'width=' + width,
          'left=' + left,
          'top=' + top,
        ].join();
      };

      // Share on Twitter
      $('a.share-on-twitter').on('click', function(e){
        var tw_text = encodeURIComponent($(this).attr('data-text'));
        var tw_url = encodeURIComponent($(this).attr('data-url'));
        var tw_hashtags = encodeURIComponent($(this).attr('data-hashtags'));
        var tw_via = encodeURIComponent($(this).attr('data-via'));
        var tw_related = encodeURIComponent($(this).attr('data-related'));

        var tw_shareurl = 'https://twitter.com/intent/tweet?text=' + tw_text + '&via=' + tw_via + '&hashtags=' + tw_hashtags + '&url=' + tw_url + '&related=' + tw_related;
        
        e.preventDefault();
        var win = window.open(tw_shareurl, 'ShareOnTwitter', getWindowOptions());
        win.opener = null;
      });

      // Share on LinkedIn
      $('a.share-on-linkedin').on('click', function(e){
        var ln_title = encodeURIComponent($(this).attr('data-title'));
        var ln_url = encodeURIComponent($(this).attr('data-url'));
        var ln_summary = encodeURIComponent($(this).attr('data-summary'));
        var ln_source = encodeURIComponent($(this).attr('data-source'));

        var ln_shareurl = 'http://www.linkedin.com/shareArticle?mini=true&url=' + ln_url + '&title=' + ln_title + '&summary=' + ln_summary + '&source=' + ln_source;
        
        e.preventDefault();
        var win = window.open(ln_shareurl, 'ShareOnLinkedIn', getWindowOptions());
        win.opener = null;
      });

    }
  }

})(jQuery, Drupal, drupalSettings);