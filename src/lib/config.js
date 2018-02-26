'use strict';

const  __components__ = (function(){
  var instance;

  function init(){
    instance = [];
    return instance;
  }

  return {
    getInstance: function(){
      if(!instance){
        instance = init();
      }

      return instance;
    }
  }
})();

// Preload instance
__components__.getInstance();

export { __components__ };
