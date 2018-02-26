'use strict';

import { template } from 'lodash';
import { __components__ } from './config';
import { Scope } from './scope';

function Component(config){
  config.template= template(config.template);
  config.scope = config.scope || {};

  return function(target){
    // To decorate a class the decorator takes only 1 param
    
    config.class = target; // A própria classe passa a ser propriedade deste componente
    __components__.getInstance().push(config);
  }
}

const ObjectStringHandler = (function(){
  return {
    getFunction: function(object){
      if(!object) return;
      object = object.replace(')','').split('(');
      return {
        function: object[0],
        args: object.splice(1,object.length -1) || []
      }
    }
  }
})();

export { Component, ObjectStringHandler };
