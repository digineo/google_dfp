/* global $ */
$(function(){
  function loadGooglePublisherTag() {
    // initialize googletag-variable
    window.googletag = window.googletag || {};
    window.googletag.cmd = [];

    // Load script
    $.ajax({
      dataType: "script",
      cache: true,
      url: "//www.googletagservices.com/tag/js/gpt.js"
    });
  }

  var tags = $("div.google-dfp:visible");

  if(tags.length == 0)
    return; // nothing to do

  if (typeof window.googletag === "undefined") {
    loadGooglePublisherTag();
  }

  var googletag = window.googletag;

  // async commands
  googletag.cmd.push(function() {

    tags.each(function(){
      var $this = $(this);
      var unit  = $this.data("unit");
      var size  = $this.data("size");
      var googleAdSlot = null;

      // define Slot
      if(size){
        size = size.split(" ").map(function(v){ return v.split("x").map(function(w){ return parseInt(w) }) });
        googleAdSlot = googletag.defineSlot(unit, size, this.id);
      }
      else{
        googleAdSlot = googletag.defineOutOfPageSlot(unit, this.id);
      }

      // add Service
      googleAdSlot.addService(googletag.pubads());

      // set Targeting
      var targeting = $this.data("targeting");
      if(targeting){
        $.each(targeting, function(k, v) {
          googleAdSlot.setTargeting(k, v);
        });
      }

      if(typeof googletag.renderEndedCallback === "function") {
        googleAdSlot.oldRenderEnded = googleAdSlot.renderEnded;
        googleAdSlot.renderEnded = function() {
          googleAdSlot.oldRenderEnded();
          googletag.renderEndedCallback();
        }
      }
    })

    // enable services
    googletag.pubads().enableSingleRequest();
    googletag.pubads().enableAsyncRendering();
    googletag.enableServices();

    // display ads
    tags.each(function(){
      googletag.display(this.id);
    })

    if(typeof googletag.callback === "function") {
      googletag.callback();
    }
  });

})
