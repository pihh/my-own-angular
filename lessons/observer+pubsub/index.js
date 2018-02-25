/*
var events = {
  events: {},
 	on: function(eventName,fn){
    this.events[eventName] =
      this.events[eventName] || [];
      this.events[eventName].push(fn);
  },
  off: function(eventName, fn){
    if(this.events[eventName]){
      for(let i = 0; i < this.events[eventName].length ; i++){
				if(this.events[eventName][i] === fn){
         	this.events[eventName].splice(i,1);
          break;
        }
      }
    }
  },
  emit: function(eventName.data){
    if(this.events[eventName]){
    	this.events[eventName].forEach(function(fn){
       fn(data);
      });
    }
  }
}

var pubSub = {
  publish: function(){

  },
  subscribe: function(){

  }
};
*/

const PubSub = (function(){
  var instance;

  function createInstance() {
     var object = {
     	events: {},
			hop: function(prop){
      	return this.events.hasOwnProperty(prop);
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

     inst.events[event].forEach(item => {
       item(data != undefined ? data : {});
     });
   },
   subscribe: function(event,listener){
   	 const inst = getInstance();

     if(!inst.hop(event)){
     	inst.events[event] = [];
     }

     const index = inst.events[event].push(listener) -1;

     return {
      remove: function(){
      	delete inst.events[event][index];
      }
     };
   },
  }
})();



var observer = {
  get: function(target,name){
    if(name in target){
     	return target[name];
    }else{
      throw `${name} is not defined in this object`;
    }
  },
  set: function(target,name,data){
    if(!target[name] || target[name] !== data){
      target[name] = data;
			PubSub.publish('scope:changed');
    }
    return target[name];
  }
}


function Scope(Component){
	const scope = new Proxy({
  	$id: Symbol(),
    $component: Component.$id
  },observer);

  PubSub.subscribe('scope:changed', function(){
   console.log('Scope changed', scope);
  });
  return scope;
};



function test(){
  const _scope = Scope({$id:Symbol()});
  _scope.a = 'xxx';
  _scope.b = 'yyy';
  _scope.b = "x";
	_scope.c = [1,2,3];
  console.log('PUSH');
  _scope.c.push(4);
  _scope.d ='xxx';
}

test();
