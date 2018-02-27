'use strict';

import { __components__ , __nodes__ } from './config';
import { ObjectStringHandler } from './component';
import { Scope } from './scope';

function Render(element,controller){
  // render and bind events
  __components__.getInstance().forEach(comp => {
    element.querySelectorAll(comp.selector).forEach(node => {
      let generateTemplateCounter = 0;
      // TODO: render with data binding - node attrs
      let inst = Scope(new comp.class());

      inst.render = function(){

        inst.$node = inst.$node || node;
        inst.$parent = inst.$parent || controller || null;

        // Bind todos os parents
        if(controller && comp.scope){
          Object.keys(comp.scope).forEach(key =>{
            const bindType = comp.scope[key];
            let classKey = node.attributes[key].name;
            let classValue = node.attributes[key].nodeValue;
            let parentValue = controller[classValue];

            if(bindType === '='){
                inst[classKey] = parentValue;
            }else if(bindType === '@'){

                const buildFunction = ObjectStringHandler.getFunction(classValue);
                inst[classKey]= function(){
                  return controller[buildFunction.function].call(...buildFunction.args);
                }

                // Break stuff:
                // console.log({
                //   func: buildFunction.function,
                //   instClassKey: inst[classKey],
                //   instParentValue: parentValue,
                //   instClassValue: classValue,
                //   inst: inst
                // });
            }else{
              inst[classKey] = parentValue;
            }
          });
        }


        function generateTemplate(){

          try{
            node.innerHTML = comp.template(inst);
            Render(node,inst);

            inst.$rendered = true;
          }catch(ex){
            generateTemplateCounter++;
            if(generateTemplateCounter < 10){
              setTimeout(generateTemplate(),100);
            }else{
              throw 'Tried to render more than 10 times. Throwing exception';
            }
          }
        }
        generateTemplate();



      }

      if(inst.__events__){
        Object.keys(inst.__events__)
          .forEach(type => {
            //@TODO: Better mapping to the nodes
            node.addEventListener(type, function(e) {
              inst.__events__[type].forEach(item => {
                if(e.target.matches(item.selector)){
                  if(item.fn.call(inst, e)){
                    console.log('Call event');
                    // inst.render(node);
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
