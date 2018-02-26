'use strict';

function Event(type,selector){
  return function(target, key, descriptor){

    if(!target.__events__) target.__events__ = {};
    if(!target.__events__[type]) target.__events__[type] = [];

    target.__events__[type].push({
      selector,
      fn: descriptor.value
    });

    return descriptor;
  }
}

export { Event };
