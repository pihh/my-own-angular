'use strict';

const PubSub = (function(){
  let instance;

  function createInstance() {
     const object = {
     	__events__: {},
			hop: function(prop){
      	return this.__events__.hasOwnProperty(prop);
     	}
     }
     return object;
  }

  function getInstance(){
   	if(!instance) {
     	instance = createInstance();
    }
    return instance;
  }

  return {
   publish: function(event,data){
		 const inst = getInstance();

     if(!inst.hop(event)){
       return;
     }

     inst.__events__[event].forEach(item => {
       item(data != undefined ? data : {});
     });
   },
   subscribe: function(event,listener){
   	 const inst = getInstance();

     if(!inst.hop(event)){
     	inst.__events__[event] = [];
     }

     const index = inst.__events__[event].push(listener) -1;

     return {
      remove: function(){
      	delete inst.__events__[event][index];
      }
     };
   },
  }
})();

export { PubSub };
