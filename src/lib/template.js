'use strict';

import { __components__ , __nodes__ } from './config';
import { ObjectStringHandler } from './component';
import { Scope } from './scope';

function Render(element,controller){
  // render and bind events
  __components__.getInstance().forEach(comp => {
    element.querySelectorAll(comp.selector).forEach(node => {

      // TODO: render with data binding - node attrs
      let inst = new comp.class();

      let i = 0;
      inst.scope = Scope(inst,() => {
         console.log('Object changed:', ++i);
       });

      inst.render = function(){

        inst.$node = node;
        inst.$parent = controller || null;

        // Bind todos os parents
        if(controller && comp.scope){
          Object.keys(comp.scope).forEach(key =>{
            const bindType = comp.scope[key];
            let classKey = node.attributes[key].name;
            let classValue = node.attributes[key].nodeValue;
            let parentValue = controller[classValue];

            if(bindType === '='){
              if(node.attributes[key]){
                inst[classKey] = parentValue;
              }
            }else if(bindType === '@'){
              if(node.attributes[key]){

                const buildFunction = ObjectStringHandler.getFunction(classValue);
                inst[classKey]= function(){
                  return controller[buildFunction.function].call(...buildFunction.args);
                }

                // Break stuff:
                console.log({
                  func: buildFunction.function,
                  instClassKey: inst[classKey],
                  instParentValue: parentValue,
                  instClassValue: classValue,
                  inst: inst
                });

              }
            }
          });
        }

        node.innerHTML = comp.template(inst);

        Render(node,inst);
      }

      if(inst.__events__){
        Object.keys(inst.__events__)
          .forEach(type => {
            //@TODO: Better mapping to the nodes
            node.addEventListener(type, function(e) {
              inst.__events__[type].forEach(item => {
                if(e.target.matches(item.selector)){
                  if(item.fn.call(inst, e)){
                    inst.render(node);
                  }
                }
              })
            },false);
        });
      }

      inst.render();
    });
  });
}

export {Render};
