$(function(){
  
  var tags = $("div.google-dfp:visible");
  
  if(tags.length == 0)
    return; // nothing to do
  
  // initialize googletag-variable
  window.googletag = window.googletag || {};
  var googletag = window.googletag;
  googletag.cmd = [];
  
  // Load script
  $.ajax({
    dataType: "script",
    cache: true,
    url: '//www.googletagservices.com/tag/js/gpt.js'
  });
  
  // async commands
  googletag.cmd.push(function() {

    // define slots
    tags.each(function(){
      var $this = $(this);
      var size  = $this.data('size').split(" ").map(function(v){ return parseInt(v) })
      var googleAdSlot = googletag.defineSlot( $this.data('unit'), size, this.id).addService(googletag.pubads());
      
      var targeting = $this.data('targeting');
      $.each(targeting, function(k, v) {
        googleAdSlot.setTargeting(k, v);
      });
      
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
