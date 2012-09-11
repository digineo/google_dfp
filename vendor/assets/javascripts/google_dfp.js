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
      googletag.defineSlot( $this.data('unit'), [$this.width(), $this.height()], this.id).addService(googletag.pubads());
    })
    
    // enable services
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
    
    // display ads
    tags.each(function(){
      googletag.display(this.id);
    })
  });
  
})
