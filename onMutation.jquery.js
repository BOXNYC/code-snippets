(function($){
  $.fn.onMutation = function(fn, mutations){
    var config = mutations || { attributes: true };
    return $(this).each(function(index, targetNode){
      if (typeof MutationObserver === typeof undefined || MutationObserver === null) return;
      var callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {
              if (typeof config[mutation.type] !== typeof undefined && config[mutation.type] !== null) {
                switch(mutation.type) {
                  case 'attributes' : fn.call(targetNode, mutation, mutation.attributeName); break;
                  default : fn.call(targetNode, mutation); break;
                }
              } 
            }
          },
          observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    });
  }
}(jQuery));
